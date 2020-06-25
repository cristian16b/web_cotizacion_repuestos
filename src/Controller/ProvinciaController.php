<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ProvinciaController extends AbstractController
{
    /**
     * @Route("/provincia", name="provincia")
     */
    public function index()
    {
        return $this->render('provincia/index.html.twig', [
            'controller_name' => 'ProvinciaController',
        ]);
    }
}
