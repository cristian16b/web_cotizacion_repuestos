<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ModeloAutoController extends AbstractController
{
    /**
     * @Route("/modelo/auto", name="modelo_auto")
     */
    public function index()
    {
        return $this->render('modelo_auto/index.html.twig', [
            'controller_name' => 'ModeloAutoController',
        ]);
    }
}
