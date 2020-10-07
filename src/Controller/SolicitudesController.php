<?php

namespace App\Controller;

use App\Entity\Solicitud;
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
 * @Route("/api/v1/solicitudes")
*/
class SolicitudesController extends AbstractController
{
    // /**
    //  * @Route("/mis/solicitudes", name="mis_solicitudes")
    //  */
    // public function index()
    // {
    //     return $this->render('mis_solicitudes/index.html.twig', [
    //         'controller_name' => 'MisSolicitudesController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Rest\Get("/repuesto/listar", name="solicitudes_listar", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 20 solicitudes realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis solicitudes."
     * )
     *
     * @SWG\Tag(name="MisSolicitudes")
     */
    public function listarSolicitudesRealizadasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $solicitudes = [];
        $message = "";

        try {
            $user = $this->getUser();
            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            $code = 200;
            $error = false;

            $em = $this->getDoctrine()->getManager();
            $solicitudes= $em->getRepository(Solicitud::class)
                    ->buscarUltimasPorId($user);

            if (is_null($solicitudes)) {
                $solicitudes = [];
            }


        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $solicitudes : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }

    /**
     * @Rest\Get("/", name="cotizaciones_listar", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 20 solicitudes realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis solicitudes."
     * )
     *
     * @SWG\Tag(name="MisSolicitudes")
     */
    public function buscarSolicitudesRealizadasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $solicitudes = [];
        $message = "";

        try {
            $user = $this->getUser();
            $name = $request->query->get('name');
            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            $code = 200;
            $error = false;

            $em = $this->getDoctrine()->getManager();
            $solicitudes= $em->getRepository(Solicitud::class)
                    ->buscarUltimasPorNombreRepuesto($user,$name);

            if (is_null($solicitudes)) {
                $solicitudes = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $solicitudes : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }

    /**
     * @Rest\Get("/ultimas/listar", name="solicitudes_ultimas_listar", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 30 solicitudes realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis solicitudes."
     * )
     *
     * @SWG\Tag(name="UltimasSolicitudes")
     */
    public function buscarUltimasSolicitudesRealizadasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $solicitudes = [];
        $message = "";

        try {
            $user = $this->getUser();
            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            $code = 200;
            $error = false;

            $em = $this->getDoctrine()->getManager();
            $solicitudes= $em->getRepository(Solicitud::class)
                    ->buscarUltimas($user);

            if (is_null($solicitudes)) {
                $solicitudes = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $solicitudes : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }

    
    /**
     * @Rest\Get("/buscar", name="solicitudes_buscar", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 30 solicitudes realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis solicitudes."
     * )
     *
     * @SWG\Tag(name="buscarSolicitudesRealizadas")
     */
    public function filtrarSolicitudesRealizadasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $solicitudes = [];
        $message = "";

        try {
            $user = $this->getUser();

            $repuesto = $request->query->get('repuesto');
            $marca = $request->query->get('marca');
            $modelo = $request->query->get('modelo');


            // si no se obtiene correctamente el usuario falla
            if(is_null($user) || ($repuesto == 'undefined' && $marca == 'undefined' && $modelo == 'undefined')) {
                throw new \Exception('Something went wrong!');
            }            

            $code = 200;
            $error = false;

            $em = $this->getDoctrine()->getManager();
            $solicitudes= $em->getRepository(Solicitud::class)
                    ->filtrarSolicitudes($repuesto,$marca,$modelo);

            if (is_null($solicitudes)) {
                $solicitudes = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $solicitudes : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
