<?php

namespace App\Controller;

use App\Entity\Compra;
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
use DateTime;


/**
* @Route("/api/v1/listar")
*/
class ComprasController extends AbstractController
{
    public static function getSubscribedServices() 
    {
        return array_merge(parent::getSubscribedServices(), [ 'jms_serializer' => '?'.SerializerInterface::class, ]); 
    }


    /**
     * @Rest\Get("/compras", name="listar_compras", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna las ultimas 20 compras realizadas."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de mis compras."
     * )
     *
     * @SWG\Tag(name="MiscomprasRecibidas")
     */
    public function listarComprasAction(Request $request)
    {
        $serializer = $this->container->get('jms_serializer');
        $compras = [];
        $message = "";

        try {
            $user = $this->getUser();
            // si no se obtiene correctamente el usuario falla
            if(is_null($user)) {
                throw new \Exception('Something went wrong!');
            }

            $code = 200;
            $error = false;

            $em = $this->getDoctrine()->getManager();
            $compras= $em->getRepository(Compras::class)
                    ->buscarUltimasPorUsuario($user);

            if (is_null($compras)) {
                $compras = [];
            }


        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $compras : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }

}
