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
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

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
    private $providerGmail = "GMAIL";

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
    public function getLogiSocialAction(Request $request, UserPasswordEncoderInterface $encoder, JWTTokenManagerInterface $JWTManager) {

        $serializer = $this->get('serializer');
        $repository = $this->getDoctrine()->getRepository(Persona::class);
        $entityManager = $this->getDoctrine()->getManager();

        $code = 200;
        $error = [];

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
            $provider = $request->request->get('provider');

            // si uno de los datos viene vacios 
            if(!$token || !$apellido || !$email || !$idSocial || !$nombre  || !$provider) 
            {
                throw new AccessDeniedException('Bad credentials.'); 
            }
            
            $persona = $repository->findOneBy([
                'email' => $email,
            ]);
            
            if(is_null($persona)) {
                $persona = new Persona();
                $user = new Usuario();
                $persona->setNombre($nombre);
                $persona->setEmail($email);
                $user->setUsername($email);
                $user->setPlainPassword($idSocial);
                $user->setPassword($encoder->encodePassword($user, $idSocial));
                $user->setRoles($this->userRolUsuario);
                $user->setUsuarioUltimaModificacion($email);
                $persona->setUsuarioUltimaModificacion($email);
                $persona->setApellido($apellido);
                $persona->setCodArea($this->datoNoInformado);
                $persona->setTelefono($this->datoNoInformado);
                $user->setSocialToken($token);
                if($provider == $this->providerFacebook) {
                    $user->setSocialProvider($this->providerFacebook);
                }
                else if($provider == $this->providerGmail) {
                    $user->setSocialProvider($this->providerGmail);
                }
                $user->setConfirmado(true);
                $user->setSocialId($idSocial);
                $persona->setUsuario($user);
            }
            else {
                $user = $persona->getUsuario();
                $user->setSocialToken($token);
                if($provider == $this->providerFacebook) {
                    $user->setSocialProvider($this->providerFacebook);
                }
                else if($provider == $this->providerGmail) {
                    $user->setSocialProvider($this->providerGmail);
                }
                $user->setSocialId($idSocial);
                $user->setConfirmado(true);
                $persona->setUsuario($user);
            }

            $entityManager->persist($persona);
            $entityManager->flush();

            if($user->getConfirmado()) {
                return new JsonResponse(
                    [
                        'token' => array("token" => $JWTManager->create($user)),
                        'code' => 200,
                        'rol' => $user->getRoles(),
                    ]);
            }
            else {
                $message = "Su perfil no ha sido verificado. "."Revise su correo " . $user->getUsername() . 
                " donde fue enviado el correo de confirmación. ".
                "De no encontrarlo como recibido, puede haber sido recibido como spam."
                ;
                return new JsonResponse(
                    [
                        'code' => 403,
                        'message' => $message,
                    ]);
            }
        }
        catch (Exception $ex) {
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
