<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MercadoPagoController extends AbstractController
{
    /**
     * @Route("/mercado/pago", name="mercado_pago")
     */
    public function index()
    {
        return $this->render('mercado_pago/index.html.twig', [
            'controller_name' => 'MercadoPagoController',
        ]);
    }
}
