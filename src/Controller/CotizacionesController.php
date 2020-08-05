<?php

namespace App\Controller;

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
* @Route("/api/v1/cotizaciones")
*/
class CotizacionesController extends AbstractController
{
    // /**
    //  * @Route("/", name="mis_cotizaciones")
    //  */
    // public function index()
    // {
    //     return $this->render('mis_cotizaciones/index.html.twig', [
    //         'controller_name' => 'MisCotizacionesController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

       /**
     * @Rest\Get("/enviar", name="cotizaciones_enviar", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="La cotizacion fue enviada."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio al enviar la cotizacion."
     * )
     *
     * @SWG\Tag(name="Repuesto")
     */
    public function enviarCotizacionAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";

        try {
            $code = 200;
            $error = false;

            $idSolicitud = $request->request->get('idSolicitud');
            $monto = $request->request->get('monto');

            dump($idSolicitud);dump($monto);die;


            if(is_null($nombreArchivo)) {
                throw new \Exception('Something went wrong!');
            }

            $em = $this->getDoctrine()->getManager();
            $repuestos= $em->getRepository(MarcaAuto::class)
                    ->buscarPorNombre($nameIngresado);

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
