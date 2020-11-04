<?php

namespace App\Controller;

use App\Entity\Cotizacion;
use App\Entity\MarcaAuto;
use App\Entity\ModeloAuto;
use App\Entity\Repuesto;
use App\Entity\RecursoSolicitud;
use App\Entity\Solicitud;
use App\Entity\EstadoSolicitud;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use App\Entity\Usuario;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use App\Entity\Compra;
use App\Entity\EstadoCotizacion;

/**
 * @Route("/mercadoPago", name="mercadopago")
*/
class MercadoPagoController extends AbstractController
{
    // private $accessTokenPrueba = "TEST-6864113784926029-082523-64405d2ff4a697e4df1bedc147234d55-167188015";
    private $accessTokenPrueba = "TEST-6377095623153819-091715-cd70a72465f42ba608c0c7f8abe8fdd6-646196739";
    private $publickeyPrueba = "TEST-475bb8d5-e6b2-4798-a5d3-367310196faf";

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    // $preference->back_urls = array(
    //     "success" =>  $this->container->get('router')->getContext()->getBaseUrl() . "/mercadoPago/pagar/aprobado",
    //     "failure" =>  $this->container->get('router')->getContext()->getBaseUrl() . "/mercadoPago/pagar/rechazado",
    //     "pending" =>  $this->container->get('router')->getContext()->getBaseUrl() . "/mercadoPago/pagar/pendiente"
    // );

    /**
     * @Route("/pagar/rechazado", name="mercadopago_rechazado")
    */
    public function registrarPagoRechazadoAction(Request $request)
    {
        // die('proceso de registro de ventas en construccion');
        $idPagoML = $request->query->get('collection_id');
        $estadoPagoML = $request->query->get('collection_status');
        $estadoDetalleML = $request->query->get('merchant_order_id');
        $tipoPagoML = $request->query->get('payment_type');
        $preference_id = $request->query->get('preference_id');

        $compra = new Compra();
        $compra->setIdPagoML($idPagoML);
        $compra->setPreferenciaIdML($preference_id);
        $compra->setEstadoDetalleML($estadoDetalleML);
        $compra->setEstadoPagoML($estadoPagoML);
        $compra->setTipoPagoML($tipoPagoML);
        // http://localhost/web_cotizacion_repuestos/public/mercadoPago/pagar?
        // collection_id=1230037994&
        // collection_status=approved&
        // payment_id=1230037994&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=1895858639&
        // preference_id=646196739-578133a6-0655-4b26-bbe4-3454d0973a88&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        // 
        // dump($compra);
        // die;
            
        $em = $this->getDoctrine()->getManager();
        $cotizacion = $em->getRepository(Cotizacion::class)
                ->buscarPreferenciaId($preference_id);

        // NOTA: si sale rechazado por los motivos que fuera se registra pero no se asocia en la solicitud
        // como una compra efectiva (lo que pasa en los otros casos) 
        $em->persist($compra);
        // $solicitud = $cotizacion->getSolicitud();
        // $solicitud->setCompra($compra);
        $em->flush();
        
        return $this->render('mercado_pago/index.html.twig', [
            'controller_name' => 'se guardo correctamente...todo terminar',
        ]);
    }


    /**
     * @Route("/pagar/pendiente", name="mercadopago_pendiente")
    */
    public function registrarPagoPendienteAction(Request $request)
    {
        // die('proceso de registro de ventas en construccion');
        $idPagoML = $request->query->get('collection_id');
        $estadoPagoML = $request->query->get('collection_status');
        $estadoDetalleML = $request->query->get('merchant_order_id');
        $tipoPagoML = $request->query->get('payment_type');
        $preference_id = $request->query->get('preference_id');

        $compra = new Compra();
        $compra->setIdPagoML($idPagoML);
        $compra->setPreferenciaIdML($preference_id);
        $compra->setEstadoDetalleML($estadoDetalleML);
        $compra->setEstadoPagoML($estadoPagoML);
        $compra->setTipoPagoML($tipoPagoML);
        // http://localhost/web_cotizacion_repuestos/public/mercadoPago/pagar?
        // collection_id=1230037994&
        // collection_status=approved&
        // payment_id=1230037994&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=1895858639&
        // preference_id=646196739-578133a6-0655-4b26-bbe4-3454d0973a88&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        // 
        // dump($compra);
        // die;
            
        $em = $this->getDoctrine()->getManager();
        $cotizacion = $em->getRepository(Cotizacion::class)
                ->buscarPreferenciaId($preference_id);

        $solicitud = $cotizacion->getSolicitud();
        $solicitud->addCompra($compra);
        $solicitud->setEstado($this->obtenerEstadoFinalizadaSolicitud());

        $compra->setSolicitud($solicitud);
        $cotizacion->setEstado($this->obtenerEstadoAceptadoCotizacion());

        $em->persist($compra);
        $em->flush();
        
        return $this->render('mercado_pago/index.html.twig', [
            'controller_name' => 'se guardo correctamente...todo terminar',
        ]);
    }

    /**
     * @Route("/pagar/aprobado", name="mercadopago_aprobado")
     */
    public function registrarPagoAprobadoAction(Request $request)
    {
        // die('proceso de registro de ventas en construccion');
        $idPagoML = $request->query->get('collection_id');
        $estadoPagoML = $request->query->get('collection_status');
        $estadoDetalleML = $request->query->get('merchant_order_id');
        $tipoPagoML = $request->query->get('payment_type');
        $preference_id = $request->query->get('preference_id');

        $compra = new Compra();
        $compra->setIdPagoML($idPagoML);
        $compra->setPreferenciaIdML($preference_id);
        $compra->setEstadoDetalleML($estadoDetalleML);
        $compra->setEstadoPagoML($estadoPagoML);
        $compra->setTipoPagoML($tipoPagoML);
        // http://localhost/web_cotizacion_repuestos/public/mercadoPago/pagar?
        // collection_id=1230037994&
        // collection_status=approved&
        // payment_id=1230037994&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=1895858639&
        // preference_id=646196739-578133a6-0655-4b26-bbe4-3454d0973a88&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        // 
        // dump($compra);
        // die;
            
        $em = $this->getDoctrine()->getManager();
        $cotizacion = $em->getRepository(Cotizacion::class)
                ->buscarPreferenciaId($preference_id);

        $solicitud = $cotizacion->getSolicitud();
        $solicitud->addCompra($compra);
        $solicitud->setEstado($this->obtenerEstadoFinalizadaSolicitud());

        $compra->setSolicitud($solicitud);
        $cotizacion->setEstado($this->obtenerEstadoAceptadoCotizacion());

        $em->persist($compra);
        $em->flush();
        
        return $this->render('mercado_pago/index.html.twig', [
            'controller_name' => 'se guardo correctamente...todo terminar',
        ]);
    }

    private function obtenerEstadoAceptadoCotizacion() {
        return $this->getDoctrine()->getManager()->getRepository(EstadoCotizacion::class)->findOneBy(array(
            'descripcion' => 'ACEPTADA'
        ));
    }

    private function obtenerEstadoFinalizadaSolicitud() {
        return $this->getDoctrine()->getRepository(EstadoSolicitud::class)->findOneBy(
            array(
                'descripcion' => 'FINALIZADA'
            )
        );
    }

    /**
     * @Rest\GET("/registrar/pago/{id}", name="_registrar_pago")
     *
     * @SWG\Response(
     *     response=201,
     *     description="El pedido ha sido registrado."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="El pedido pude ser registrado."
     * )
     */
    public function registrarPagoAction(Request $request,$id) {

        die('registrar');
        // $code = 200;
        // $error = false;
        // $serializer = $this->container->get('jms_serializer');
        // $em = $this->getDoctrine()->getManager();
 
        // $user = [];
        // $message = "";


        // try {
        //     $user = $this->getUser();
        //     // si no se obtiene correctamente el usuario falla
        //     if(is_null($user)) {
        //         throw new \Exception('Something went wrong!');
        //     }

        //     // Agrega credenciales
        //     MercadoPago\SDK::setAccessToken($this->accessTokenPrueba);

        //     // Crea un objeto de preferencia
        //     $preference = new MercadoPago\Preference();
        
        //     // Crea un ítem en la preferencia
        //     $item = new MercadoPago\Item();
        //     $item->title = 'Mi producto';
        //     $item->description = 'Descripción de Mi producto';
        //     $item->quantity = 1;
        //     $item->unit_price = 75;
        //     $preference->items = array($item);   
        //     $preference->save();
        

        //     // $idMarca = $request->request->get('idMarca');
        //     // $idModelo = $request->request->get('idModelo');
        //     // $idRepuesto = $request->request->get('idRepuesto');
        //     // $imagenes = $request->request->get('imagenes');
        //     // $observaciones = $request->request->get('observaciones');
 
        //     // $repuesto = $this->obtenerRepuesto($idRepuesto);
        //     // $modelo = $this->obtenerModeloAuto($idModelo);
        //     // $marca = $this->obtenerMarcaAuto($idMarca);

        //     // if(is_null($repuesto) || is_null($marca) || is_null($modelo) || is_null($imagenes)) {
        //     //     throw new \Exception('Something went wrong!');
        //     // }

        //     // $solicitud = new Solicitud();
        //     // $solicitud->setSolicitante($user);
        //     // $solicitud->setRepuesto($repuesto);
        //     // // no necesito setear la marca por la relacion con 
        //     // $solicitud->setModeloAuto($modelo);
        //     // $solicitud->setObservacion($observaciones);
        //     // $solicitud->setEstado($this->obtenerEstadoIniciada());

        //     // // $recurso->set
        //     // $errorFiles = '';
        //     // foreach($imagenes as $index => $imagen) {
        //     //     $recurso = new RecursoSolicitud();
        //     //     $imagenBase64 = $imagen['dataURL'];
        //     //     $recurso->setBase64($imagenBase64);
        //     //     $recurso->obtenerNombreLogico($index,$repuesto->getName());
        //     //     $recurso->setDirectorio($this->getParameter('kernel.project_dir'));
        //     //     $solicitud->addRecurso($recurso);
        //     // }

        //     // $formErrors = $this->obtenerErrores($solicitud,$validator);

        //     // if($formErrors) {
        //     //     $response = [
        //     //         'code' => 0,
        //     //         'error' => $formErrors,
        //     //     ];
        //     //     return new JsonResponse($response);
        //     // }

        //     // $em->persist($solicitud);
        //     // $em->flush();
 
        // } catch (Exception $ex) {
        //     $code = 500;
        //     $error = true;
        //     $message = "Ocurrio un error al intentar agregar al usuario - Error: {$ex->getMessage()}";
        // }
 
        // $response = [
        //     'code' => $code,
        //     'error' => $error,
        //     // 'data' => $code == 200 ? $user : $message,
        // ];
 
        // return new Response($serializer->serialize($response, "json"));
    }
}
