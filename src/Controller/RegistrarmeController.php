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
use App\Entity\Localidad;
use App\Entity\ConstanciaPersona;
use App\Entity\TipoConstancia;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Validator\Constraints as AppAssert;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Validator\Constraints\DateTime;

/**
* @Route("/api")
*/
class RegistrarmeController extends AbstractController
{
    private $userAdminDefultd = "USER_ADMIN";
    private $userRolUsuario = "ROLE_USER";
    private $userRolComerciante = "ROLE_COMERCIANTE";
    private $userRolAdmin = "ROLE_ADMIN";

    private $tipoDNI = "DNI";
    private $tipoAfip = "INSCRIPCIÒN AFIP";

    private $errorEmail = "El e-mail ingresado ya se encuentra registrado";

    private $baseUrlEisenPartProduccion = 'https://www.eisenparts.com';

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
            $formErrors = [];

            $apellido = $request->request->get('apellido');
            $name = $request->request->get('nombre');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $codArea = $request->request->get('codArea');
            $telefono = $request->request->get('telefono');
            $esComerciante = $request->request->get('esComerciante');
            $localidadId = $request->request->get('localidad');

            $user = new Usuario();
            $persona = new Persona();
            $domicilio = new Domicilio();

            $user->setPlainPassword($password);
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setUsuarioUltimaModificacion($email);
            $user->setUsername($email);
            // en el registro se le asigna un token al usuario
            $user->setSocialToken($this->obtenerTokenAutenticacion());
            // inicialmente el usuario esta deshabilitado
            $user->setConfirmado(false);
            // se activara su cuenta cuando ingrese a su correo y click en el link

            $persona->setUsuario($user);
            $persona->setNombre($name);
            $persona->setEmail($email);
            $persona->setApellido($apellido);
            $persona->setCodArea($codArea);
            $persona->setTelefono($telefono);
            $persona->setUsuarioUltimaModificacion($email);

            $nombreError = $validator->validateProperty($persona, 'nombre');
            $apellidoError = $validator->validateProperty($persona, 'apellido');
            // por algun motivo no toma el assert unique entity se comenta esto:
            // $emailError = $validator->validateProperty($persona, 'email');
            // se cambia por un find 
            if(!is_null($this->obtenerPersona($email))) {
                $formErrors['email'] = $this->errorEmail;
            }

            $passwordError = $validator->validateProperty($user, 'plainPassword');
            $codtelError = $validator->validateProperty($persona, 'codArea');
            $telefonoError = $validator->validateProperty($persona, 'telefono');
            
            if($esComerciante == "true") 
            {

                $localidad = $this->obtenerLocalidad($localidadId);     
                $archivos = $request->files;

                $fileDni = $archivos->get("constanciaDni");
                $fileAfip = $archivos->get("constanciaAfip");
                
                if(is_null($fileAfip) || is_null($fileDni) || is_null($localidad)) {
                    throw new \Exception('Something went wrong!');
                }

                $calle = $request->request->get('calle');
                $nro = $request->request->get('nro');

                $domicilio->setCalle($calle);
                $domicilio->setNumero($nro);
                $domicilio->setLocalidad($localidad);
                $persona->setDomicilio($domicilio);


                $constanciaDni = new ConstanciaPersona();
                $constanciaAfip = new ConstanciaPersona();
                $tipoConstanciaDni = $this->obtenerTipoConstancia($this->tipoDNI);
                $tipoConstanciaAfip = $this->obtenerTipoConstancia($this->tipoAfip);
                $constanciaDni->setTipo($tipoConstanciaDni);
                $constanciaDni->setFile($fileDni);
                $constanciaAfip->setFile($fileAfip);
                $constanciaAfip->setTipo($tipoConstanciaAfip);
                $persona->addConstanciaPersona($constanciaAfip);
                $persona->addConstanciaPersona($constanciaDni);
                $constanciaDni->setPersona($persona);
                $constanciaAfip->setPersona($persona);

                $calleError = $validator->validateProperty($domicilio, 'calle');
                $nroError = $validator->validateProperty($domicilio, 'numero');

                $user->setRoles($this->userRolComerciante);

                if(count($calleError)>0){
                    $formErrors['calle'] =  $telefonoError[0]->getMessage();
                }
                if(count($nroError)>0){
                    $formErrors['nro'] =  $telefonoError[0]->getMessage();
                }
            }
            else 
            {
                $user->setRoles($this->userRolUsuario);
            }
       
            if(count($nombreError)>0){
                $formErrors['nombre'] =  $nombreError[0]->getMessage();
            }
            if(count($apellidoError)>0){
                $formErrors['apellido'] =  $apellidoError[0]->getMessage();
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
                    'code' => 400,
                    'error' => $formErrors,
                ];
                return new JsonResponse($response);
            }

            $em->persist($persona);
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

    /**
     * @Route("/verificar/{token}", name="verificar" , methods={"GET"})
    */
    public function verificarCuenta(Request $request,$token) {

        if(is_null($token)) {
            throw new \Exception('Something went wrong!');
        }

        $usuario = $this->obtenerUsuarioAsociadaToken($token);
        // dump($usuario);

        // dump($usuario->getCreatedAt());

        $hoy = date('Y-m-d H:i:s');
        // dump($hoy);

        $to_time = strtotime($usuario->getCreatedAt()->format('Y-m-d H:i:s'));
        $from_time = strtotime($hoy);
        echo round(abs($to_time - $from_time) / 60,2). " minute";


        die;
    }

    private function obtenerLocalidad($id) {
        return $this->getDoctrine()->getRepository(Localidad::class)->find($id);
    }

    private function obtenerTipoConstancia($name) {
        return $this->getDoctrine()->getRepository(TipoConstancia::class)->findOneBy(array('nombre'=>$name));
    }

    private function obtenerPersona($email) {
        return $this->getDoctrine()->getRepository(Persona::class)->findOneBy(array('email'=>$email));
    }

    private function obtenerUsuarioAsociadaToken($token) {
        return $this->getDoctrine()->getRepository(Usuario::class)->findOneBy(array('socialToken'=>$token));
    }

    private function obtenerUrlConfirmacionCuenta() {
        return $this->baseUrlEisenPartProduccion . '/api/verificar/' . $this->obtenerTokenAutenticacion();
    }

    private function enviarCorreoNotificacion($persona,$usuario) {

        $url = $this->obtenerUrlConfirmacionCuenta();

        $email = (new TemplatedEmail())
            ->from('info@eisenparts.com')
            ->to(new Address($persona->getEmail()))
            ->subject('EisenPart - Confirma tu perfil de usuario')
        
            // path of the Twig template to render
            ->htmlTemplate('registrarme/confirmation_email.html.twig')
        
            // pass variables (name => value) to the template
            ->context([
                'url' => $url,
                'email' => $persona->getEmail(),
            ])
        ;
    }

    private function obtenerTokenAutenticacion() {
        return rtrim(strtr(base64_encode(random_bytes(20)), '+/', '-_'), '=');
    }
}
