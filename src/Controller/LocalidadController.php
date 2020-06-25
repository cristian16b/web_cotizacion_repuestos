<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LocalidadController extends AbstractController
{
    /**
     * @Route("/localidad", name="localidad")
     */
    public function index()
    {
        return $this->render('localidad/index.html.twig', [
            'controller_name' => 'LocalidadController',
        ]);
    }
}
