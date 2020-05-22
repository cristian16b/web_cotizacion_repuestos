<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\MarcaAuto;
use App\Entity\TipoRepuesto;

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

    // /**
    //  * @Route("/descargar/categorias", name="descargar_categoria")
    // */
    public function descargarCategoriasAction(){
        $url = 'https://api.mercadolibre.com/categories/MLA1747?fbclid=IwAR1-kxVLDOzlNLoYhoTKT7Qrcvrltb3h96UnhljGr6T6OzWrGyUa6WaQ6_A';
        $data = file_get_contents($url);
        file_put_contents('./../mla/categoriasRepuestos.json',$data);
        die;
    }

    // /**
    //  * @Route("/importar/categorias", name="descargar_categoria")
    // */
    public function importatCategoriasAction(){
        dump('importo categorias');
        $data = file_get_contents('./../mla/categoriasRepuestos.json');
        $dataJson = json_decode($data,true);
        $categorias = $dataJson['children_categories'];
        $tr = new TipoRepuesto();
        $entityManager = $this->getDoctrine()->getManager();
        foreach($categorias as $cat){
            $tr->setName($cat['name']);
            $tr->setMlaId($cat['id']);
            // dump($marca);
            $entityManager->persist($tr);
            $entityManager->flush();
            $entityManager->clear();
        }
        dump('end');
        die;
    }

    // /**
    //  * @Route("/importar/auto/marca", name="importar_auto_marca")
    //  */
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
