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

    private $datoNoInformado = "NO INFORMADO";
    private $providerFacebook = "FACEBOOK";

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
     * @Rest\Post("/login_social", name="login_social")
     *
     **/
    public function getLogiSocialAction(Request $request, UserPasswordEncoderInterface $encoder) {

        $serializer = $this->get('serializer');
        $repository = $this->getDoctrine()->getRepository(Usuario::class);
        $entityManager = $this->getDoctrine()->getManager();

        /*
        los datos vienen
            apellido
            email
            id
            nombre
            token
        */

        try {
            $apellido = $request->request->get('apellido');
            $email = $request->request->get('email');
            $idSocial = $request->request->get('id');
            $nombre = $request->request->get('nombre');
            $token = $request->request->get('token');

            $user = $repository->findOneBy([
                'email' => $email,
            ]);
            
            
            if(is_null($user)) {
                $user = new Usuario();
                $user->setNombre($nombre);
                $user->setEmail($email);
                $user->setUsername($email);
                $user->setPlainPassword($idSocial);
                $user->setPassword($encoder->encodePassword($user, $idSocial));
                $user->setRoles($this->userRolUsuario);
                $user->setUsuarioUltimaModificacion($email);
                $user->setApellido($apellido);
                $user->setCodArea($this->datoNoInformado);
                $user->setTelefono($this->datoNoInformado);
            }

            $user->setSocialToken($token);
            $user->setSocialProvider($this->providerFacebook);
            $user->setSocialId($idSocial);

            $entityManager->persist($user);
            $entityManager->flush();
        }
        catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Ocurrio un error al intentar agregar al usuario - Error: {$ex->getMessage()}";
        }

    
        $code = 200;
        $error = [];
        $response = [
            'code' => $code,
            'error' => $error,
            // 'data' => $code == 200 ? $user : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
}
