<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MisSolicitudesController extends AbstractController
{
    /**
     * @Route("/mis/solicitudes", name="mis_solicitudes")
     */
    public function index()
    {
        return $this->render('mis_solicitudes/index.html.twig', [
            'controller_name' => 'MisSolicitudesController',
        ]);
    }
}
