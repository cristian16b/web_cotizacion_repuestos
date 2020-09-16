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
use MercadoPago;

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

            foreach($solicitudes as $solicitud) {
                $cotizaciones = $solicitud->getCotizaciones();
                foreach($cotizaciones as $cotizacion) {
                    // dump($cotizacion);
                    $idPreferencia = $this->obtenerPreferencia($solicitud,$cotizacion);
                    die($idPreferencia);
                }
            }
            die;

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

    private function obtenerPreferencia($solicitud,$cotizacion) {

        MercadoPago\SDK::setAccessToken('TEST-6864113784926029-082523-64405d2ff4a697e4df1bedc147234d55-167188015');
        
        // Crea un objeto de preferencia
        $preference = new MercadoPago\Preference();
        $preference->back_urls = array(
            "success" => "/success",
            "failure" => "/failure",
            "pending" => "/pending"
        );
        // $preference->auto_return = "approved";
        $preference->payment_methods = array(
            "excluded_payment_types" => array(
              array("id" => "ticket")
            ),
            "installments" => 12,
        );

        // Crea un ítem en la preferencia
        $repuesto = $solicitud->getRepuesto();
        $repuestoString = $repuesto->toString();
        $modelo = $solicitud->getModeloAuto();
        $modeloString = $modelo->toString();

        $item = new MercadoPago\Item();
        $item->title = "EisenParts - Compra repuesto";
        $item->description = $repuestoString . ' ' . $modeloString;
        $item->quantity = 1;
        $item->unit_price = $cotizacion->getMonto();
        $item->category_id = "automotive";
        $item->currency_id = "ARS";


        $vendedor = $cotizacion->getOferente();
        $persona = $this->obtenerPersona($vendedor);

        $payer = new MercadoPago\Payer();
        $payer->name = $persona->getNombre();
        $payer->surname = $persona->getApellido();
        $payer->email = $persona->getEmail();
        $payer->date_created = "2018-06-02T12:58:41.425-04:00";
        $payer->phone = array(
            "area_code" => "",
            "number" => "949 128 866"
        );
        
        $preference->items = array($item);
        $preference->payer = $payer;
        $preference->marketplace_fee = 100;
        $preference->save();

        return $preference->id;
    }

    private function obtenerPersona($usuario) {
        $email = $usuario->getUsername();
        return $this->getDoctrine()->getRepository(Persona::class)->findOneBy(array('email'=>$email));
    }

    /**
     * @Rest\Get("/repuesto/buscar", name="solicitudes_repuesto_buscar", defaults={"_format":"json"})
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
