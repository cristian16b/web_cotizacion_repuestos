<?php

namespace App\Controller;

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
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Usuario;

class CambiarPassController extends AbstractController
{
    // /**
    //  * @Route("/cambiar/pass", name="cambiar_pass")
    //  */
    // public function index()
    // {
    //     return $this->render('cambiar_pass/index.html.twig', [
    //         'controller_name' => 'CambiarPassController',
    //     ]);
    // }
    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }
         /**
     * @Rest\Post("/cambiarContrasenia", name="perfil_cambiar_contrasenia")
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
     *     name="_email",
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
     * @SWG\Tag(name="Cambiar password ")
     */
    public function cambiarContraseniaAction(Request $request, UserPasswordEncoderInterface $encoder,ValidatorInterface $validator) {
        $serializer = $this->container->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
 
        $user = [];
        $message = "";
 
        try {

            $code = 200;
            $error = false;
            $formErrors = [];

            $email = $request->request->get('email');
            $contraseniaI = $request->request->get('password');
            $contraseniaII = $request->request->get('password2');

            if(is_null($email) || is_null($contraseniaI) || is_null($contraseniaII)) {
                throw new \Exception('Something went wrong!');
            }

            if($contraseniaI != $contraseniaII) {
                $formErrors['passdistintas'] = "Las contraseñas ingresadas no son iguales.";
            }

            $user = $this->obtenerUsuario($email);
            $user->setPlainPassword($contraseniaI);
            $user->setPassword($encoder->encodePassword($user, $contraseniaI));
            $user->setUsuarioUltimaModificacion($email);

            $passwordError = $validator->validateProperty($user, 'plainPassword');
            if(count($passwordError)>0){
                $formErrors['password'] =  $passwordError[0]->getMessage();
            }

            if($formErrors) {
                $response = [
                    'code' => 400,
                    'error' => $formErrors,
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

    private function obtenerUsuario($email){
        return $this->getDoctrine()->getRepository(Usuario::class)->findOneBy(array('username'=>$email));
    }
}
