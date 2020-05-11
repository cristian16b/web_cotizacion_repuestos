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
    private $userRolUsuario = ["ROLE_USER"];
    private $userRolComerciante = ["ROLE_COMERCIANTE"];
    private $userRolAdmin = ["ROLE_ADMIN"];

    /**
     * @Route("/login", name="login")
     */
    public function index()
    {
        return $this->render('login/index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

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
     *
     * @SWG\Parameter(
     *     name="_password",
     *     in="body",
     *     type="string",
     *     description="The password",
     *     schema={}
     * )
     *
     * @SWG\Tag(name="User")
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
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder) {
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
            //     "password2" => "sooo"
            //     "email" => "sooso"
            //   ]

            $apellido = $request->request->get('apellido');
            $name = $request->request->get('nombre');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $codArea = $request->request->get('codArea');
            $telefono = $request->request->get('telefono');
            $pass2 = $request->request->get('password2');
 
            $user = new Usuario();
            $user->setNombre($name);
            $user->setEmail($email);
            $user->setUsername($email);
            $user->setPlainPassword($password);
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setRoles($this->userRolAdmin);
            $user->setUsuarioUltimaModificacion($email);
            $user->setApellido($apellido);
            $user->setCodArea($codArea);
            $user->setTelefono($telefono);
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
            'data' => $code == 200 ? $user : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
}
