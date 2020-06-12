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

        $nombreArchivo = $request->query->get('fileName');

        if(is_null($nombreArchivo)) {
            throw new \Exception('Something went wrong!');
        }

        $extension = substr($nombreArchivo,strripos($nombreArchivo, '.'));

        $filepath = '../fotosSolicitudes/' . $nombreArchivo;
        $response = new Response();
        
        if(file_exists($filepath)){
            $response->headers->set('Content-Type', 'image/' . $extension);
            $response->setContent(file_get_contents($filepath));
        }
        else {
            throw new \Exception('Something went wrong!');
        }
        return $response;
    }
}