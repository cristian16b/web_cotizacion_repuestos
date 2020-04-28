<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MisPerfilController extends AbstractController
{
    /**
     * @Route("/mis/perfil", name="mis_perfil")
     */
    public function index()
    {
        return $this->render('mis_perfil/index.html.twig', [
            'controller_name' => 'MisPerfilController',
        ]);
    }
}
