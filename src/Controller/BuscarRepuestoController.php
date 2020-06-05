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
    public function registerAction(Request $request) {
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

            if(is_null($repuesto) || is_null($marca) || is_null($modelo)) {
                throw new \Exception('Something went wrong!');
            }

            $solicitud = new Solicitud();
            $solicitud->setSolicitante($user);
            $solicitud->setRepuesto($repuesto);
            // no necesito setear la marca por la relacion con 
            $solicitud->setModeloAuto($modelo);
            $solicitud->setObservacion($observaciones);
        
            $recurso = new RecursoSolicitud();
            // $recurso->set
            foreach($imagenes as $imagen) {
                // dump($imagen['dataURL']);
                $imagenBase64 = $imagen['dataURL'];
                $extension = $this->obtenerExtensionImagen($imagenBase64);
                $tamanioBytes = $this->obtenerTamanioImagen($imagenBase64);
                dump($this->obtenerNombreFisico($extension));
                dump($this->obtenerNombreLogico($extension,$user->getId(),$repuesto->getName()));
            }
            die;
            // $formErrors = $this->obtenerErrores();


            // if($formErrors) {
            //     $response = [
            //         'code' => 0,
            //         'error' => $error,
            //     ];
            //     return new JsonResponse($response);
            // }

            // $em->persist($user);
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

    private function obtenerRepuesto($id){
        return $this->getDoctrine()->getRepository(Repuesto::class)->find($id);
    }

    private function obtenerMarcaAuto($id){
        return $this->getDoctrine()->getRepository(MarcaAuto::class)->find($id);
    }

    private function obtenerModeloAuto($id) {
        return $this->getDoctrine()->getRepository(ModeloAuto::class)->find($id);
    }

    private function obtenerTamanioImagen($img) {
        // https://stackoverflow.com/questions/53228948/how-to-get-image-file-size-from-base-64-string-in-javascript
        // x = (n * (3/4)) - y
        // no se substrae el elemento y porque solo varia en uno o dos bits y obtenerlo es un costo innecesario
        // formulada aplicada x = (n * (3/4)) bytes
        return strlen($img) * (3/4);
    }

    private function obtenerExtensionImagen($img) {
        // https://stackoverflow.com/questions/18658437/get-image-type-from-base64-encoded-src-string
        $match = '';
        preg_match("/^data:image\/(.*);base64/i",$img, $match);
        return $match[1];
    }

    // ejemplo userId_1200_bateria_12/10/20 12:20.png
    private function obtenerNombreLogico($imgExtension,$idUser,$nombreRepuesto) {
        return 'userId_' . $idUser . '_' . $nombreRepuesto . '_' . date('d/m/Y')  . '.' . $imgExtension;
    }

    private function obtenerNombreFisico($imgExtension) {
        return md5(uniqid()).'.'. $imgExtension;
    }
    // private function obtenerErrores() {

    //     $nombreError = $validator->validateProperty($user, 'nombre');
    //     $apellidoError = $validator->validateProperty($user, 'apellido');
    //     $emailError = $validator->validateProperty($user, 'email');
    //     $passwordError = $validator->validateProperty($user, 'password');
    //     $codtelError = $validator->validateProperty($user, 'codArea');
    //     $telefonoError = $validator->validateProperty($user, 'telefono');

    //     if(count($nombreError)>0){
    //         $formErrors['nombre'] =  $nombreError[0]->getMessage();
    //     }
    //     if(count($apellidoError)>0){
    //         $formErrors['apellido'] =  $apellidoError[0]->getMessage();
    //     }
    //     if(count($emailError)>0){
    //         $formErrors['email'] =  $emailError[0]->getMessage();
    //     }
    //     if(count($passwordError)>0){
    //         $formErrors['password'] =  $passwordError[0]->getMessage();
    //     }
    //     if(count($codtelError)>0){
    //         $formErrors['codArea'] =  $codtelError[0]->getMessage();
    //     }
    //     if(count($telefonoError)>0){
    //         $formErrors['telefono'] =  $telefonoError[0]->getMessage();
    //     }
    // }
}
