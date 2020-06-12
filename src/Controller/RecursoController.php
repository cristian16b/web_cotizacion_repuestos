<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
* @Route("/recurso")
* */
class RecursoController extends AbstractController
{
    // /**
    //  * @Route("/recurso", name="recurso")
    //  */
    // public function index()
    // {
    //     return $this->render('recurso/index.html.twig', [
    //         'controller_name' => 'RecursoController',
    //     ]);
    // }

    /**
    * @Route("/get/foto", name="get_recurso_foto")
    */
    public function getRecurso(Request $request) {

        $filepath = '../fotosSolicitudes/3fb8d945d977334e8a60250958956852.jpg';
        $response = new Response();
        
        if(file_exists($filepath)){
            $response->headers->set('Content-Type', 'image/png');
            $response->setContent(file_get_contents($filepath));
        }
        return $response;
        }
    }