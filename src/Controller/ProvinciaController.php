<?php

namespace App\Controller;

use App\Entity\Provincia;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Config\Definition\Exception\Exception;

/**
* @Route("/provincia")
* */
class ProvinciaController extends AbstractController
{
    // /**
    //  * @Route("/provincia", name="provincia")
    //  */
    // public function index()
    // {
    //     return $this->render('provincia/index.html.twig', [
    //         'controller_name' => 'ProvinciaController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Route("/getByName", name="provincia_getByName")
     */
    public function getByNameAction(Request $request){
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";
        

        try {
            $code = 200;
            $error = false;

            $nameIngresado = trim($request->query->get('name'));
            $em = $this->getDoctrine()->getManager();
            $provincias= $em->getRepository(Provincia::class)
                    ->buscarPorNombre($nameIngresado);

                    

            if (is_null($provincias)) {
                $provincias = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $provincias : $message,
        ];

        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
