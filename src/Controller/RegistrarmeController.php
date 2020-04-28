<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/registrarme", name="registrarme")
*/
class RegistrarmeController extends AbstractController
{
    /**
     * @Route("/", name="registrarme")
     */
    public function index()
    {
        return $this->render('registrarme/index.html.twig', [
            'controller_name' => 'RegistrarmeController',
        ]);
    }
}
