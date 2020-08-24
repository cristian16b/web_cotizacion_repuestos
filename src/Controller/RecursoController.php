<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\ConstanciaPersona;

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

        $filepath = $this->getParameter('kernel.project_dir') . '/fotosSolicitudes/' . $nombreArchivo;
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

    /**
    * @Route("/get/foto/cotizacion", name="get_recurso_foto_cotizacion")
    */
    public function getRecursoCotizacion(Request $request) {

        $nombreArchivo = $request->query->get('fileName');

        if(is_null($nombreArchivo)) {
            throw new \Exception('Something went wrong!');
        }

        $extension = substr($nombreArchivo,strripos($nombreArchivo, '.'));

        $filepath = $this->getParameter('kernel.project_dir') . '/fotosCotizaciones/' . $nombreArchivo;
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

   /**
    * @Route("/get/archivo/{nombreArchivo}", name="get_recurso_archivo")
    */
    public function getArchivoAction(Request $request,$nombreArchivo) {

        if(is_null($nombreArchivo)) {
            throw new \Exception('Something went wrong!');
        }

        // busco constancia
        $archivo = $this->getDoctrine()->getRepository(ConstanciaPersona::class)->findOneBy(
            [
                'nombreFisico' => $nombreArchivo
            ]
        );

        $filepath =  $this->getParameter('kernel.project_dir') . '/constancias/' .  $archivo->getTipo()->getNombre() . 
                        '/' . $nombreArchivo;

        $extension = substr($nombreArchivo,strripos($nombreArchivo, '.'));

        $response = new Response();
        
        if(file_exists($filepath)){

            if($extension == '.jpeg') {
                $response->headers->set('Content-Type', 'image/jpeg');
            }
            else if($extension == '.png') {
                $response->headers->set('Content-Type', 'image/png');
            }
            else if($extension == '.pdf') {
                $response->headers->set('Content-Type', 'application/pdf');
            }
            else {
                throw new \Exception('Something went wrong!');
            }

            $response->setContent(file_get_contents($filepath));
        }
        else {
            throw new \Exception('Something went wrong!');
        }
        return $response;
    }
}