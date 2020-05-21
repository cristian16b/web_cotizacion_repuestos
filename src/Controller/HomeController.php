<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\MarcaAuto;

class HomeController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    /**
     * @Route("/importar/auto/marca", name="importar_auto_marca")
     */
    public function importarAction()
    {
        dump('importacion de datos de modelos de autos desde mercadolibre');
        dump('curl GET https://api.mercadolibre.com/categories/MLA1744 > marcasAutos.json');
        $data = file_get_contents('./../mla/marcasAutos.json');
        $dataJson = json_decode($data,true);
        $marcas = $dataJson['children_categories'];
        $m = new MarcaAuto();
        $entityManager = $this->getDoctrine()->getManager();
        foreach($marcas as $marca){
            $m->setName($marca['name']);
            $m->setMlaId($marca['id']);
            // dump($marca);
            $entityManager->persist($m);
            $entityManager->flush();
            $entityManager->clear();
        }
        dump('importacion finalizada,ver en phpmyadmin');
        die;
        // return $this->render('home/index.html.twig', [
        //     'controller_name' => 'HomeController',
        // ]);
    }
}
