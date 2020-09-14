<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

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
            CURLOPT_POSTFIELDS => "client_secret=TEST-6864113784926029-082523-64405d2ff4a697e4df1bedc147234d55-167188015&
                code=". $code . "
                grant_type=authorization_code&
                redirect_uri=http%3A//localhost/web_cotizacion_repuestos/public/index.php/registrar/vendedor",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/x-www-form-urlencoded"
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
        die;
    }
}
