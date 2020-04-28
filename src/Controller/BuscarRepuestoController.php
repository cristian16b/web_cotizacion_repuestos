<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BuscarRepuestoController extends AbstractController
{
    /**
     * @Route("/buscar/repuesto", name="buscar_repuesto")
     */
    public function index()
    {
        return $this->render('buscar_repuesto/index.html.twig', [
            'controller_name' => 'BuscarRepuestoController',
        ]);
    }
}
