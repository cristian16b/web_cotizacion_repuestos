<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Config\Definition\Exception\Exception;
use App\Entity\Localidad;

/**
 * @Route("/localidad", name="localidad")
*/
class LocalidadController extends AbstractController
{
    // public function index()
    // {
    //     return $this->render('localidad/index.html.twig', [
    //         'controller_name' => 'LocalidadController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Route("/getByName", name="localidad_getByName")
     */
    public function getByNameAction(Request $request){
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";
        

        try {
            $code = 200;
            $error = false;

            $nameIngresado = trim($request->query->get('name'));
            $idProvincia = trim($request->query->get('idProvincia'));
            $em = $this->getDoctrine()->getManager();
            $localidades= $em->getRepository(Localidad::class)
                    ->buscarPorNombre($nameIngresado,$idProvincia);

            if (is_null($localidades)) {
                $localidades = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $localidades : $message,
        ];

        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
