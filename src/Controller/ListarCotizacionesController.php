<?php

namespace App\Controller;

use App\Entity\Cotizacion;
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
* @Route("/api/v1/listar/cotizaciones")
*/
class ListarCotizacionesController extends AbstractController
{
    // /**
    //  * @Route("/listar/cotizaciones", name="listar_cotizaciones")
    //  */
    // public function index()
    // {
    //     return $this->render('listar_cotizaciones/index.html.twig', [
    //         'controller_name' => 'ListarCotizacionesController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Rest\Get("/", name="listar_cotizaciones_recibidas", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 20 cotizaciones realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis cotizaciones."
     * )
     *
     * @SWG\Tag(name="MisCotizacionesRecibidas")
     */
    public function listarCotizacionesRecibidasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $cotizaciones = [];
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
            $cotizaciones= $em->getRepository(Cotizacion::class)
                    ->buscarUltimasPorUsuario($user);

            if (is_null($cotizaciones)) {
                $cotizaciones = [];
            }


        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $cotizaciones : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
