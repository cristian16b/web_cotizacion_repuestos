<?php

namespace App\Controller;

use App\Entity\ModeloAuto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerInterface;

/**
 * @Route("/api/v1/modelo/auto")
*/
class ModeloAutoController extends AbstractController
{
    // /**
    //  * @Route("/modelo/auto", name="modelo_auto")
    //  */
    // public function index()
    // {
    //     return $this->render('modelo_auto/index.html.twig', [
    //         'controller_name' => 'ModeloAutoController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

       /**
     * @Rest\Get("/getByName", name="modelo_auto_getAll", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna todos los repuestos."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de los repuestos."
     * )
     *
     * @SWG\Tag(name="Repuesto")
     */
    public function getByNameAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";

        try {
            $code = 200;
            $error = false;

            $nameIngresado = trim($request->query->get('name'));
            $idMarcaIngresado = trim($request->query->get('idMarca'));
            $em = $this->getDoctrine()->getManager();
            $repuestos= $em->getRepository(ModeloAuto::class)
                    ->buscarPorNombre($nameIngresado,$idMarcaIngresado);

            if (is_null($repuestos)) {
                $repuestos = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $repuestos : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
