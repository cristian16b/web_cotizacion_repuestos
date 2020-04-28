<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/perfil")
*/
class MisPerfilController extends AbstractController
{
    /**
     * @Route("/", name="mi_perfil")
     */
    public function index()
    {
        return $this->render('mis_perfil/index.html.twig', [
            'controller_name' => 'MisPerfilController',
        ]);
    }
}
