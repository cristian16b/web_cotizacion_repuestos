<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
    * @Route("/repuesto")
*/
class BuscarRepuestoController extends AbstractController
{
    /**
     * @Route("/", name="buscar_repuesto")
     */
    public function index()
    {
        return $this->render('buscar_repuesto/index.html.twig', [
            'controller_name' => 'BuscarRepuestoController',
        ]);
    }
}
