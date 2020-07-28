<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

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
     * @Rest\Get("/getPerfil", name="perfil_usuario", defaults={"_format":"json"})
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

    }
}
