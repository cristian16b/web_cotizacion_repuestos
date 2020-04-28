<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/contacto")
*/
class ContactoController extends AbstractController
{
    /**
     * @Route("/", name="contacto")
     */
    public function index()
    {
        return $this->render('contacto/index.html.twig', [
            'controller_name' => 'ContactoController',
        ]);
    }
}
