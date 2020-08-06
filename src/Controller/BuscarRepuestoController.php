<?php

namespace App\Controller;

use App\Entity\MarcaAuto;
use App\Entity\ModeloAuto;
use App\Entity\Repuesto;
use App\Entity\RecursoSolicitud;
use App\Entity\Solicitud;
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

/**
* @Route("/api/v1/solicitud/repuesto")
*/
class BuscarRepuestoController extends AbstractController
{
    // /**
    //  * @Route("/", name="buscar_repuesto")
    //  */
    // public function index()
    // {
    //     return $this->render('home/index.html.twig', [
    //         'controller_name' => 'HomeController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Rest\Post("/nueva", name="solicitud_repuesto_nueva")
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
     *
     * @SWG\Parameter(
     *     name="_name",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_email",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_username",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_password",
     *     in="query",
     *     type="string",
     *     description="The password"
     * )
     *
     * @SWG\Tag(name="Registrar ")
     */
    public function registerAction(Request $request,ValidatorInterface $validator) {
        // die;
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

            $code = 200;
            $error = false;

            $idMarca = $request->request->get('idMarca');
            $idModelo = $request->request->get('idModelo');
            $idRepuesto = $request->request->get('idRepuesto');
            $imagenes = $request->request->get('imagenes');
            $observaciones = $request->request->get('observaciones');
 
            $repuesto = $this->obtenerRepuesto($idRepuesto);
            $modelo = $this->obtenerModeloAuto($idModelo);
            $marca = $this->obtenerMarcaAuto($idMarca);

            if(is_null($repuesto) || is_null($marca) || is_null($modelo) || is_null($imagenes)) {
                throw new \Exception('Something went wrong!');
            }

            $solicitud = new Solicitud();
            $solicitud->setSolicitante($user);
            $solicitud->setRepuesto($repuesto);
            // no necesito setear la marca por la relacion con 
            $solicitud->setModeloAuto($modelo);
            $solicitud->setObservacion($observaciones);
            $solicitud->setEstado($this->obtenerEstadoIniciada());

            // $recurso->set
            $errorFiles = '';
            foreach($imagenes as $index => $imagen) {
                $recurso = new RecursoSolicitud();
                $imagenBase64 = $imagen['dataURL'];
                $recurso->setBase64($imagenBase64);
                $recurso->obtenerNombreLogico($index,$repuesto->getName());
                $solicitud->addRecurso($recurso);
            }

            $formErrors = $this->obtenerErrores($solicitud,$validator);

            if($formErrors) {
                $response = [
                    'code' => 0,
                    'error' => $formErrors,
                ];
                return new JsonResponse($response);
            }

            $em->persist($solicitud);
            $em->flush();
 
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

    private function obtenerRepuesto($id){
        return $this->getDoctrine()->getRepository(Repuesto::class)->find($id);
    }

    private function obtenerMarcaAuto($id){
        return $this->getDoctrine()->getRepository(MarcaAuto::class)->find($id);
    }

    private function obtenerModeloAuto($id) {
        return $this->getDoctrine()->getRepository(ModeloAuto::class)->find($id);
    }

    private function obtenerEstadoIniciada() {
        return $this->getDoctrine()->getRepository(EstadoSolicitud::class)->findOneBy(
            array(
                'descripcion' => 'INICIADA'
            )
        );
    }

    private function obtenerErrores($solicitud,$validator) {
        $formErrors = [];

        $observaciones = $validator->validateProperty($solicitud, 'observaciones');
        $recursos = $validator->validateProperty($solicitud, 'recursos');
        $repuesto = $validator->validateProperty($solicitud, 'repuesto');
        $modelo = $validator->validateProperty($solicitud, 'modelo');

        if(count($observaciones)>0){
            $formErrors['observaciones'] =  $observaciones[0]->getMessage();
        }
        if(count($recursos)>0){
            $formErrors['recursos'] =  $recursos[0]->getMessage();
        }
        if(count($repuesto)>0){
            $formErrors['modelo'] =  $modelo[0]->getMessage();
        }

        $recursos = $solicitud->getRecursos();
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
}
