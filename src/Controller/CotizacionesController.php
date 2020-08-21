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
use App\Entity\RecursoCotizacion;
use DateTime;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;

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
    public function enviarCotizacionAction(Request $request,ValidatorInterface $validator)
    {
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";

        try {
            $code = 200;
            $error = false;
            $user = $this->getUser();

            $idSolicitud = trim($request->request->get('idSolicitud'));
            $monto = trim($request->request->get('monto'));
            $imagenes =  $request->request->get('imagenes');
            $observaciones =  trim($request->request->get('observaciones'));

            if(is_null($idSolicitud) || is_null($monto) || is_null($user) || is_null($imagenes)) {
                throw new \Exception('Something went wrong!');
            }

            $solicitud = $this->obtenerSolicitud($idSolicitud);
            $repuesto = $solicitud->getRepuesto();

            if(is_null($idSolicitud)) {
                throw new \Exception('Something went wrong!');
            }

            $cotizacion = new Cotizacion();
            $cotizacion->setMonto($monto);
            $cotizacion->setEstado($this->obtenerEstadoCotizacionEnviada());
            $cotizacion->setSolicitud($solicitud);
            $cotizacion->setfechaLimiteValidez($this->obtenerFechaVencimiento());
            $cotizacion->setOferente($user);
            $cotizacion->setObservacion($observaciones);

            // $recurso->set
            $errorFiles = '';
            foreach($imagenes as $index => $imagen) {
                $recurso = new RecursoCotizacion();
                $imagenBase64 = $imagen['dataURL'];
                $recurso->setBase64($imagenBase64);
                $recurso->obtenerNombreLogico($index,$repuesto->getName());
                $recurso->setDirectorio($this->getParameter('kernel.project_dir'));
                $cotizacion->addRecursoCotizacion($recurso);
            }

            $formErrors = $this->obtenerErrores($cotizacion,$validator);

            if($formErrors) {
                $response = [
                    'code' => 0,
                    'error' => $formErrors,
                ];
                return new JsonResponse($response);
            }
    
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($cotizacion);
            $entityManager->flush();

            // implementar funcion para enviar notificacion por correo

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

    private function obtenerErrores($cotizacion,$validator) {
        $observaciones = $cotizacion->getObservacion();
        $formErrors = [];

        $mensajeErrorCorreo = "No pueden ingresarse correos en el campo de observación";
        $mensajeErrorWeb = "No pueden ingresarse correos en el campo de observación";
        $mensajeErrorTelefono = "No pueden ingresarse teléfonos en el campo de observación";
        $mensajeErrorRedes = "No pueden ingresarse redes sociales en el campo de observación";
        $mensajeErrorDomicilio = "No pueden ingresarse domicilios en el campo de observación";

        if($observaciones != "") {
            // debo investigar si tiene un correo 
            // o si aparece un arroba 
            // o un dominio (hotmail, outlook, gmail, yahoo, aol)
            // 
            if(preg_match("/@|arroba/", $observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorCorreo;
            }

            if(preg_match("/[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/", $observaciones, $matches)) {
                $formErrors['observaciones'] = $mensajeErrorCorreo;
            }

            if(preg_match("/hotmail|outlook|gmail|yahoo|aol/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorCorreo;
            }

            // verificar que no se mandan paginas web
            if(preg_match("/www|www.|.com|http|https/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorWeb;
            }

            // verificiar que no tiene redes sociales
            if(preg_match("/face|facebook|insta|instagram/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorRedes;
            }

            // verificar que no se pasa direccion
            if(preg_match("/domicilio|dirección|encontranos en|dir es|dirección es|direccion es/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorDomicilio;
            }

            // verificar que no mande un telefono
            // ver casos posibles de detectar telefonos
            if(preg_match("/llamamos|celular/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorTelefono;
            } 
            
            if(preg_match("/[0-9]{7,}/",$observaciones)) {
                $formErrors['observaciones'] = $mensajeErrorTelefono;
            } 
            
        }

        $recursos = $cotizacion->getRecursoCotizacions();
        $recursoErrors = [];
        foreach($recursos as $index => $recurso) {
            $recursoError = $validator->validateProperty($recurso, 'pesoMega');
            if(count($recursoError)>0) {
                $recursoError[$index] =  $recursoError[0]->getMessage();
            }
        }

        if(!empty($recursoErrors)) {
            $formErrors['fotos'] = $recursoErrors;
        }

        return $formErrors;
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
