<?php

namespace App\EventListener;

use App\Entity\CredencialML;
use App\Entity\Usuario;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use DateTime;

class AuthenticationSuccessListener extends AbstractController
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $usuario = new Usuario();
        $usuario = $event->getUser();
        if($usuario->getConfirmado()) {
            $tieneCredencialML = true;
            $urlML = "";
            $roles = $usuario->getRoles();
            if(in_array("ROLE_COMERCIANTE", $roles)) {
                // debemos obtener si tiene una credencial ML activa
                $em = $this->getDoctrine()->getManager();
                $credencial= $em->getRepository(CredencialML::class)
                                ->buscarPorUsuario($usuario);

                // dump(empty($credencial));die;
                // si no tiene credencial debemos solicitarlas
                if(empty($credencial)) {
                    $tieneCredencialML = false;
                    $urlML = "https://auth.mercadopago.com.ar/authorization?client_id=".$this->getParameter('appIdMercadoPago')."&response_type=code&platform_id=mp&state=id=".$usuario->getTokenProvisorioMP()."=&redirect_uri=".$this->getParameter('urlObtenerIdVendedorMercadoPago');
                }
            }
            $event->setData([
                'code' => 200,
                'rol' => $event->getUser()->getRoles(),
                'token' => $event->getData(),
                'credencialML' => $tieneCredencialML,
                'url' => $urlML,
            ]);
        }
        else {
            $message = "Su perfil no ha sido verificado. "."Revise su correo " . $usuario->getUsername() . 
                " donde fue enviado el correo de confirmación. ".
                "De no encontrarlo como recibido, puede haber sido recibido como spam."
            ;
            $event->setData([
                'code' => 403,
                'message' => $message,
            ]);
        }
    }

   public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
   {
       $response = new JWTAuthenticationFailureResponse('Authentication failed', 401);
       $event->setResponse($response);
   }

    private function obtenerTokenAutenticacion() {
        return rtrim(strtr(base64_encode(random_bytes(20)), '+/', '-_'), '=');
    }
}