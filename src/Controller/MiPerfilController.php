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
use App\Entity\Persona;
use App\Entity\ConstanciaPersona;

/**
 * @Route("/api/v1/perfil")
*/
class MiPerfilController extends AbstractController
{
    // /**
    //  * @Route("/mi/perfil", name="mi_perfil")
    //  */
    // public function index()
    // {
    //     return $this->render('mi_perfil/index.html.twig', [
    //         'controller_name' => 'MiPerfilController',
    //     ]);
    // }

    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }

    /**
     * @Rest\Get("/getPerfil", name="get_perfil_usuario", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna el perfil."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda del perfil."
     * )
     *
     * @SWG\Tag(name="Perfil")
     */
    public function getPerfilAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $solicitudes = [];
        $message = "";

        try 
        {
            $code = 200;
            $error = false;
            $constancias = array();
            $domicilio = array();
            $user = $this->getUser();

            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            // buscar la persona asociada 
            $perfil = $this->getDoctrine()->getRepository(Persona::class)->findOneBy(
                [
                    'email' => $user->getUsername()
                ]
            );

            if (is_null($perfil)) {
                $perfil = [];
            }
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $perfil : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
