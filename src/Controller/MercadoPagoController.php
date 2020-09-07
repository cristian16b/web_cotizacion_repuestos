<?php

namespace App\Controller;

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
use DateTime;
use MercadoPago;

/**
 * @Route("/api/v1/mercadoPago", name="mercadopago")
*/
class MercadoPagoController extends AbstractController
{
    private $accessTokenPrueba = "TEST-6864113784926029-082523-64405d2ff4a697e4df1bedc147234d55-167188015";
    private $publickeyPrueba = "TEST-475bb8d5-e6b2-4798-a5d3-367310196faf";

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Route("/pagar", name="_pagar")
     */
    public function index()
    {
        return $this->render('mercado_pago/index.html.twig', [
            'controller_name' => 'MercadoPagoController',
        ]);
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

        $code = 200;
        $error = false;
        $serializer = $this->container->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
 
        $user = [];
        $message = "";


        try {
            $user = $this->getUser();
            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            // Agrega credenciales
            MercadoPago\SDK::setAccessToken($this->accessTokenPrueba);

            // Crea un objeto de preferencia
            $preference = new MercadoPago\Preference();
        
            // Crea un ítem en la preferencia
            $item = new MercadoPago\Item();
            $item->title = 'Mi producto';
            $item->description = 'Descripción de Mi producto';
            $item->quantity = 1;
            $item->unit_price = 75;
            $preference->items = array($item);   
            $preference->save();
        

            // $idMarca = $request->request->get('idMarca');
            // $idModelo = $request->request->get('idModelo');
            // $idRepuesto = $request->request->get('idRepuesto');
            // $imagenes = $request->request->get('imagenes');
            // $observaciones = $request->request->get('observaciones');
 
            // $repuesto = $this->obtenerRepuesto($idRepuesto);
            // $modelo = $this->obtenerModeloAuto($idModelo);
            // $marca = $this->obtenerMarcaAuto($idMarca);

            // if(is_null($repuesto) || is_null($marca) || is_null($modelo) || is_null($imagenes)) {
            //     throw new \Exception('Something went wrong!');
            // }

            // $solicitud = new Solicitud();
            // $solicitud->setSolicitante($user);
            // $solicitud->setRepuesto($repuesto);
            // // no necesito setear la marca por la relacion con 
            // $solicitud->setModeloAuto($modelo);
            // $solicitud->setObservacion($observaciones);
            // $solicitud->setEstado($this->obtenerEstadoIniciada());

            // // $recurso->set
            // $errorFiles = '';
            // foreach($imagenes as $index => $imagen) {
            //     $recurso = new RecursoSolicitud();
            //     $imagenBase64 = $imagen['dataURL'];
            //     $recurso->setBase64($imagenBase64);
            //     $recurso->obtenerNombreLogico($index,$repuesto->getName());
            //     $recurso->setDirectorio($this->getParameter('kernel.project_dir'));
            //     $solicitud->addRecurso($recurso);
            // }

            // $formErrors = $this->obtenerErrores($solicitud,$validator);

            // if($formErrors) {
            //     $response = [
            //         'code' => 0,
            //         'error' => $formErrors,
            //     ];
            //     return new JsonResponse($response);
            // }

            // $em->persist($solicitud);
            // $em->flush();
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Ocurrio un error al intentar agregar al usuario - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            // 'data' => $code == 200 ? $user : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
}
