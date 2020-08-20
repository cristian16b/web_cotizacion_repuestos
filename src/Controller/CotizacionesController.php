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
            $imagenes =  $request->request->get('imagenes');
            $observaciones =  $request->request->get('observaciones');

            // pregunto si es no vacio
            $observaciones = trim($observaciones);
            if($observaciones != "") {
                // debo investigar si tiene un correo 
                // o si aparece un arroba 
                // o un dominio (hotmail, outlook, gmail, yahoo, aol)
                // 
                if(preg_match("/@|arroba/", $observaciones)) {
                    die('falla porque hay un arroba');
                    return false;
                }

                if(preg_match("/[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/", $observaciones, $matches)) {
                    die('falla porque hay un correo');
                    return false;
                }

                if(preg_match("/hotmail|outlook|gmail|yahoo|aol/",$observaciones)) {
                    die('falla porque hay un dominio de correo');
                    return false;
                }


                // verificar que no se mandan paginas web
                if(preg_match("/www|www.|.com|http|https/",$observaciones)) {
                    die('falla porque hay una web');
                    return false;
                }

                // verificiar que no tiene redes sociales
                if(preg_match("/face|facebook|insta|instagram/",$observaciones)) {
                    die('falla porque hay una red social');
                    return false;
                }

                // verificar que no se pasa direccion
                if(preg_match("/domicilio|dirección|encontranos en|buscanos en|dir es|dirección es|direccion es/",$observaciones)) {
                    die('falla porque hay un domicilio');
                    return false;
                }

                // verificar que no mande un telefono
                // ver casos posibles de detectar telefonos
                if(preg_match("/face|facebook|insta|instagram/",$observaciones)) {
                    die('falla porque hay una red social');
                    return false;
                }               
            }

            die;
            if(is_null($idSolicitud) || is_null($monto) || is_null($user) || is_null($imagenes)) {
                throw new \Exception('Something went wrong!');
            }




            $solicitud = $this->obtenerSolicitud($idSolicitud);
            $cotizacion = new Cotizacion();
            $cotizacion->setMonto($monto);
            $cotizacion->setEstado($this->obtenerEstadoCotizacionEnviada());
            $cotizacion->setSolicitud($solicitud);
            $cotizacion->setfechaLimiteValidez($this->obtenerFechaVencimiento());
            $cotizacion->setOferente($user);
    
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

    // private function obtenerErrores()

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
