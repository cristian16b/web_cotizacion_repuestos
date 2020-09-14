<?php

namespace App\Controller;

use App\Entity\CredencialML;
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
        // dump($request->query->get('code'));
        try 
        {
            $code = $request->query->get('code');
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
                CURLOPT_POSTFIELDS => "client_secret=TEST-6864113784926029-082523-64405d2ff4a697e4df1bedc147234d55-167188015
                &code=".$code."
                &grant_type=authorization_code
                &redirect_uri=http%3A//localhost/web_cotizacion_repuestos/public/index.php/vincular/vendedor",
                CURLOPT_HTTPHEADER => array(
                  "Content-Type: application/x-www-form-urlencoded"
                ),
              ));
              
            $response = curl_exec($curl);
            dump($response); 
            curl_close($curl);
            $credencial = new CredencialML();
            $credencial->setTokenAcceso($response['access_token']);
            $credencial->setTokenActualizar($response['refresh_token']);


            $mensaje = "Se ha vinculado exitosamente ";
        } catch (Exception $ex) {
                $code = 500;
                $error = true;
                $mensaje = "Ocurrio un error inesperado, intente nuevamente mas tarde!";
        }

        return $this->render('registrar_vendedor/index.html.twig', [
            'controller_name' => 'RegistrarVendedorController',
            'mensaje' => $mensaje,
        ]);
    }
}
