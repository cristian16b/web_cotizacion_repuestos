<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class RegistrarVendedorController extends AbstractController
{
    /**
     * @Route("/registrar/vendedor", name="registrar_vendedor")
     */
    public function index()
    {
        return $this->render('registrar_vendedor/index.html.twig', [
            'controller_name' => 'RegistrarVendedorController',
        ]);
    }
}
