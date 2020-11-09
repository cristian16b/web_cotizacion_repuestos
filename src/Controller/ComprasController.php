<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ComprasController extends AbstractController
{
    /**
     * @Route("/compras", name="compras")
     */
    public function index()
    {
        return $this->render('compras/index.html.twig', [
            'controller_name' => 'ComprasController',
        ]);
    }
}
