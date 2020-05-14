<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;


class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $event->setData([
            'code' => 200,
            'rol' => $event->getUser()->getRoles(),
            'token' => $event->getData(),
        ]);
    }

   public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
   {
       $response = new JWTAuthenticationFailureResponse('Authentication failed', 401);
       $event->setResponse($response);
   }
}