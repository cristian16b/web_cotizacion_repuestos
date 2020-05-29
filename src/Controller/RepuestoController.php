<?php

namespace App\Controller;

use App\Entity\Repuesto;
use App\Repository\RepuestoRepository;
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
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;


/**
 * @Route("/api/v1/repuesto")
*/
class RepuestoController extends AbstractController
{
    // dans ta classe
    private $serializer;

    public function __construct( SerializerInterface $serializer)
    {
        $this->serialize = $serializer;
    }

    // /**
    //  * @Route("/repuesto", name="repuesto")
    //  */
    // public function index()
    // {
    //     return $this->render('repuesto/index.html.twig', [
    //         'controller_name' => 'RepuestoController',
    //     ]);
    // }

       /**
     * @Rest\Get("/getByName", name="tipoRepuesto_getAll", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Retorna todos los repuestos."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="Un error ocurrio en la busqueda de los repuestos."
     * )
     *
     * @SWG\Tag(name="Repuesto")
     */
    public function getByNameAction(Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $repuestos = [];
        $message = "";

        try {
            $code = 200;
            $error = false;

            $nameIngresado = trim($request->query->get('name'));
            $em = $this->getDoctrine()->getManager();
            $repuestos= $em->getRepository(Repuesto::class)
                    ->buscarPorNombre($nameIngresado);

            if (is_null($repuestos)) {
                $repuestos = [];
            }

        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "Error: {$ex->getMessage()}";
        }

        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $repuestos : $message,
        ];
        
        return new Response(
            $serializer->serialize(
                $response,
                "json"
            )
        );
    }
}
