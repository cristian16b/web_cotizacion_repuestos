<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;


class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $usuario = $event->getUser();
        if($usuario->getConfirmado()) {
            $roles = $usuario->getRoles();
            // dump($roles);die;
            if(in_array("ROLE_COMERCIANTE", $roles)) {
                dump('es comerciante');
            }
            else {
                dump('no lo es');
            }
            die;
            $event->setData([
                'code' => 200,
                'rol' => $event->getUser()->getRoles(),
                'token' => $event->getData(),
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
}