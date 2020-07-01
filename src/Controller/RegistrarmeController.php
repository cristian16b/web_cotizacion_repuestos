<?php

namespace App\Controller;

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
use App\Entity\Persona;
use App\Entity\Domicilio;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;


/**
* @Route("/api")
*/
class RegistrarmeController extends AbstractController
{
    private $userAdminDefultd = "USER_ADMIN";
    private $userRolUsuario = "ROLE_USER";
    private $userRolComerciante = "ROLE_COMERCIANTE";
    private $userRolAdmin = "ROLE_ADMIN";

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    // /**
    //  * @Route("/", name="registrarme")
    //  */
    // public function index()
    // {
    //     return $this->render('registrarme/index.html.twig', [
    //         'controller_name' => 'RegistrarmeController',
    //     ]);
    // }
    /**
     * @Rest\Post("/register", name="user_register")
     *
     * @SWG\Response(
     *     response=201,
     *     description="El usuario ha sido registrado."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="El usuario no pude ser registrado."
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
     * @SWG\Tag(name="User")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder,ValidatorInterface $validator) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $user = [];
        $message = "";
 
        try {
    
            $code = 200;
            $error = false;

            $apellido = $request->request->get('apellido');
            $name = $request->request->get('nombre');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $codArea = $request->request->get('codArea');
            $telefono = $request->request->get('telefono');
            $esComerciante = $request->request->get('esComerciante');
            $calle = $request->request->get('calle');
            $nro = $request->request->get('nro');
            $localidad = $request->request->get('localidad');
            dump($localidad);die;

            
            $archivos = $request->files;
            $constanciaDni = $archivos->get("constanciaDni");
            $constanciaAfip = $archivos->get("constanciaAfip");

            $user = new Usuario();
            $persona = new Persona();
            $domicilio = new Domicilio();

            $user->setPlainPassword($password);
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setUsuarioUltimaModificacion($email);
            $user->setUsername($email);

            if($esComerciante) 
            {
                $user->setRoles($this->userRolComerciante);
            }
            else 
            {
                $user->setRoles($this->userRolUsuario);
            }

            $domicilio->setCalle($calle);
            $domicilio->setNumero($nro);
            $domicilio->setLocalidad($localidad);

            $persona->setUsuario($user);
            $persona->setNombre($name);
            $persona->setEmail($email);
            $persona->setApellido($apellido);
            $persona->setCodArea($codArea);
            $persona->setTelefono($telefono);
            $persona->setDomicilio($domicilio);

            dump($domicilio);
            dump($user);
            dump($persona);
            die;


            $nombreError = $validator->validateProperty($user, 'nombre');
            $apellidoError = $validator->validateProperty($user, 'apellido');
            $emailError = $validator->validateProperty($user, 'email');
            $passwordError = $validator->validateProperty($user, 'password');
            $codtelError = $validator->validateProperty($user, 'codArea');
            $telefonoError = $validator->validateProperty($user, 'telefono');
       
            $formErrors = [];
            if(count($nombreError)>0){
                $formErrors['nombre'] =  $nombreError[0]->getMessage();
            }
            if(count($apellidoError)>0){
                $formErrors['apellido'] =  $apellidoError[0]->getMessage();
            }
            if(count($emailError)>0){
                $formErrors['email'] =  $emailError[0]->getMessage();
            }
            if(count($passwordError)>0){
                $formErrors['password'] =  $passwordError[0]->getMessage();
            }
            if(count($codtelError)>0){
                $formErrors['codArea'] =  $codtelError[0]->getMessage();
            }
            if(count($telefonoError)>0){
                $formErrors['telefono'] =  $telefonoError[0]->getMessage();
            }

            if($formErrors) {
                $response = [
                    'code' => 0,
                    'error' => $error,
                ];
                return new JsonResponse($response);
            }

            $em->persist($user);
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

    private function obtenerLocalidad($id) {

    }
}
