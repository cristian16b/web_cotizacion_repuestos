<?php

namespace App\Controller;

use App\Entity\CredencialML;
use App\Entity\Usuario;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Config\Definition\Exception\Exception;

class RegistrarVendedorController extends AbstractController
{
    /**
     * @Route("/registrar/vendedor", name="registrar_vendedor")
     */
    public function index()
    {
        return $this->render('registrar_vendedor/index.html.twig', [
            'controller_name' => 'RegistrarVendedorController',
        ]);
    }

    /**
    * @Route("/vincular/vendedor", name="vincular_vendedor")
    */
    public function vincularVendedorAction(Request $request) {

        try 
        {
            $bandera = false;
            $code = $request->query->get('code');
            $token = $request->query->get('state');
            $t = substr($token, 3);
            $tokenUsuario = substr($t, 0, -1);
            // dump($tokenUsuario);die;
            $curl = curl_init();
    
            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.mercadopago.com/oauth/token",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "client_secret=TEST-6377095623153819-091715-cd70a72465f42ba608c0c7f8abe8fdd6-646196739
                &code=".$code."
                &grant_type=authorization_code
                &redirect_uri=http%3A//localhost/web_cotizacion_repuestos/public/index.php/vincular/vendedor",
                CURLOPT_HTTPHEADER => array(
                  "Content-Type: application/x-www-form-urlencoded"
                ),
              ));
              
            $json = curl_exec($curl);
            $response = json_decode($json, true);
            curl_close($curl);
            if(array_key_exists('message', $response)) {
                throw new \Exception('Something went wrong!');
            }
            $credencial = new CredencialML();
            $credencial->setTokenAcceso($response["access_token"]);
            $credencial->setTokenActualizar($response["refresh_token"]);
            $credencial->setUsuario($this->obtenerUsuario($tokenUsuario));
            $credencial->setFechaUltimaActualizacion(new DateTime('now'));

            // preparamos y persistimos 
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($credencial);
            $entityManager->flush();

            $bandera = true;
        } catch (Exception $ex) {
                $code = 500;
                $error = true;
                $bandera = false;
        }

        return $this->render('registrar_vendedor/index.html.twig', [
            'bandera' => $bandera,
        ]);
    }

    private function obtenerUsuario($token) {
        return $this->getDoctrine()->getRepository(Usuario::class)->findOneBy(array('tokenProvisorioMP'=>$token));
    }
}
