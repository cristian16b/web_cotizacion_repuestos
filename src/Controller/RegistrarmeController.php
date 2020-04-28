<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class RegistrarmeController extends AbstractController
{
    /**
     * @Route("/registrarme", name="registrarme")
     */
    public function index()
    {
        return $this->render('registrarme/index.html.twig', [
            'controller_name' => 'RegistrarmeController',
        ]);
    }
}
