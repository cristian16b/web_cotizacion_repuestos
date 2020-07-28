<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MiPerfilController extends AbstractController
{
    /**
     * @Route("/mi/perfil", name="mi_perfil")
     */
    public function index()
    {
        return $this->render('mi_perfil/index.html.twig', [
            'controller_name' => 'MiPerfilController',
        ]);
    }
}
