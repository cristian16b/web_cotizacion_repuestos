<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MisCotizacionesController extends AbstractController
{
    /**
     * @Route("/mis/cotizaciones", name="mis_cotizaciones")
     */
    public function index()
    {
        return $this->render('mis_cotizaciones/index.html.twig', [
            'controller_name' => 'MisCotizacionesController',
        ]);
    }
}
