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
use App\Entity\Solicitud;
use App\Entity\Cotizacion;
use App\Entity\EstadoCotizacion;
use DateTime;

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
     * @Rest\Post("/enviar", name="cotizaciones_enviar", defaults={"_format":"json"})
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
     * @SWG\Parameter(
     *     name="idSolicitud",
     *     in="body",
     *     type="number",
     *     description="id de la solicitud",
     *     schema={}
     * )
     * 
     * @SWG\Tag(name="EnviarCotizacion")
     */
    public function enviarCotizacionAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";

        try {
            $code = 200;
            $error = false;
            $user = $this->getUser();

            $idSolicitud = $request->request->get('idSolicitud');
            $monto = $request->request->get('monto');
            if(is_null($idSolicitud) || is_null($monto) || is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            $solicitud = $this->obtenerSolicitud($idSolicitud);

            $cotizacion = new Cotizacion();
            $cotizacion->setMonto($monto);
            $cotizacion->setEstado($this->obtenerEstadoCotizacionEnviada());
            $cotizacion->setSolicitud($solicitud);
            $cotizacion->setfechaLimiteValidez($this->obtenerFechaVencimiento());

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($cotizacion);
            $entityManager->flush();

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

    private function obtenerSolicitud($id) {
        return $this->getDoctrine()->getManager()->getRepository(Solicitud::class)->find($id);
    }

    private function obtenerEstadoCotizacionEnviada() {
        return $this->getDoctrine()->getManager()->getRepository(EstadoCotizacion::class)->findOneBy(array(
            'descripcion' => 'ENVIADA'
        ));
    }

    private function obtenerFechaVencimiento() {
        $hoy = new DateTime('now');
        $hoy->modify('+7 day');
        return $hoy;
    }
}
