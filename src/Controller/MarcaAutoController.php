<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MarcaAutoController extends AbstractController
{
    /**
     * @Route("/marca/auto", name="marca_auto")
     */
    public function index()
    {
        return $this->render('marca_auto/index.html.twig', [
            'controller_name' => 'MarcaAutoController',
        ]);
    }
}
