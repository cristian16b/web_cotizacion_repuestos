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
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\ORM\EntityManagerInterface;


/**
 * LoginController.php
 *
 * Login Controller
 *
 * @category   Controller
 * @package    Login
 * @author     Budzicz, Cristian Gonzalo
 * @copyright  ---
 * @license    ---
 * 
 * @Route("/api")
 */
class LoginController extends AbstractController
{
    private $userAdminDefultd = "USER_ADMIN";
    private $userRolUsuario = "ROLE_USER";
    private $userRolComerciante = "ROLE_COMERCIANTE";
    private $userRolAdmin = "ROLE_ADMIN";

    // /**
    //  * @Route("/login", name="login")
    //  */
    // public function index()
    // {
    //     return $this->render('login/index.html.twig', [
    //         'controller_name' => 'LoginController',
    //     ]);
    // }

    /**
     * @Rest\Post("/login_check", name="user_login_check")
     *
     * @SWG\Response(
     *     response=200,
     *     description="Se ha ingresado correctamente"
     * )
     * @SWG\Response(
     *     response=500,
     *     description="No fue posible iniciar sesión. Intente nuevamente!"
     * )
     *
     * @SWG\Parameter(
     *     name="_username",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={
     *     }
     * )
     */
    public function getLoginCheckAction() {}
     
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
        // die;
        $serializer = $this->get('serializer');
        $em = $this->getDoctrine()->getManager();
 
        $user = [];
        $message = "";
 
        try {
    
            $code = 200;
            $error = false;

            // ejemplo de como vienen los datos desde el front-end
            //   [         
            //     "apellido" => "ooso"
            //     "nombre" => "oso"
            //     "codArea" => "oso"
            //     "telefono" => "ososo"
            //     "password" => "sooso"
            //     "email" => "sooso"
            //   ]

            $apellido = $request->request->get('apellido');
            $name = $request->request->get('nombre');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $codArea = $request->request->get('codArea');
            $telefono = $request->request->get('telefono');
 
            $user = new Usuario();
            $user->setNombre($name);
            $user->setEmail($email);
            $user->setUsername($email);
            $user->setPlainPassword($password);
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setRoles($this->userRolUsuario);
            $user->setUsuarioUltimaModificacion($email);
            $user->setApellido($apellido);
            $user->setCodArea($codArea);
            $user->setTelefono($telefono);


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
}
