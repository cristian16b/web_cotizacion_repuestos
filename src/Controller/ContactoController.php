<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\MailerInterface;

/**
* @Route("/contacto")
*/
class ContactoController extends AbstractController
{
    // /**
    //  * @Route("/", name="contacto")
    //  */
    // public function index()
    // {
    //     return $this->render('contacto/index.html.twig', [
    //         'controller_name' => 'ContactoController',
    //     ]);
    // }

    private $mailer;
    
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Route("/enviar", name="contacto_enviar")
     */
    public function enviarMensajeAction(Request $request){
        $serializer = $this->container->get('jms_serializer');
        $repuestos = [];
        $message = "";
        

        try {
            $code = 200;
            $error = false;

            $email = trim($request->request->get('email'));
            $mensaje = trim($request->request->get('mensaje'));
            $nombreApellido = trim($request->request->get('nombreApellido'));

            
            if(is_null($email) || is_null($mensaje) || is_null($nombreApellido)) {
                throw new \Exception('Something went wrong!');
            }

            $this->enviarCorreoNotificacion($email,$nombreApellido,$mensaje);

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $provincias : $message,
        ];

        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }

    private function enviarCorreoNotificacion($email,$nombreApellido,$mensaje) {

        $url = $this->obtenerUrlConfirmacionCuenta($usuario);

        $email = (new TemplatedEmail())
            ->from('info@eisenparts.com')
            ->to('info@eisenparts.com')
            ->subject('EisenPart - Consulta recibida')
        
            // path of the Twig template to render
            ->htmlTemplate('contacto/contacto_email.html.twig')
        
            // pass variables (name => value) to the template
            ->context([
                'email' => $email,
                'mensaje' => $mensaje,
                'nombreApellido' => $nombreApellido
            ])
        ;
        $this->mailer->send($email);
    }

}
