<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\MarcaAuto;
use App\Entity\ModeloAuto;
use App\Entity\TipoRepuesto;
use App\Entity\Repuesto;
use APP\Repository\TipoRepuestoRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
    //  * @Route("/descargar/archivos/repuesto", name="descargar_archivos_repuestos")
    // */
    public function descargarArchivosRepuestosAction(){

        $data = file_get_contents('./../mla/categoriasRepuestos.json');
        $dataJson = json_decode($data,true);
        $categorias = $dataJson['children_categories'];
        $urlbase = 'https://api.mercadolibre.com/categories/';
        foreach($categorias as $key=> $cat){
            $id = $cat['id'];
            $url = $urlbase . $id;
            $nombreArchivo = 'repuesto_'.$key.'.json';
            // dump($url);
            // dump($nombreArchivo);
            $this->guardarArchivo($url,$nombreArchivo);
        }
        die('end');
    }

    private function guardarArchivo($url,$nombreArchivo){
        $data = file_get_contents($url);
        $pathArchivo = './../mla/' . $nombreArchivo;
        file_put_contents($pathArchivo,$data);
    }

    private function leerArchivo($path) {
        $data = file_get_contents($path);
        $dataJson = json_decode($data,true);
        return $dataJson;
    }

    // /**
    //  * @Route("/descargar/archivos/marcas", name="descargar_archivos_marcas")
    // */
    public function descargarArchivosMarcasAction(){

        $data = file_get_contents('./../mla/marcasAutos.json');
        $dataJson = json_decode($data,true);
        $categorias = $dataJson['children_categories'];
        $urlbase = 'https://api.mercadolibre.com/categories/';
        foreach($categorias as $key=> $cat){
            $id = $cat['id'];
            $url = $urlbase . $id;
            $nombreArchivo = 'marca_auto_'.$key.'.json';
            // dump($url);
            // dump($nombreArchivo);
            // $this->guardarArchivo($url,$nombreArchivo);
            // se descargaron los primeros 47 archivos y fallo por timeout
            // se agrega lo siguiente para descargar los que faltan
            if($key > 47) {
                // dump($nombreArchivo);
                $this->guardarArchivo($url,$nombreArchivo);
            }
        }
        die('end');
    }

    // /**
    //  * @Route("/importar/modelos", name="descargar_categoria")
    // */
    public function importarModelosAction(){
        $cantidad = 64; //sacado a ojo mirando la cantidad de filas insertadas,todo automatizar
        // $this->ejecutarImportacionMarca(0,1);
        // $this->ejecutarImportacionMarca(1,20);
        // $this->ejecutarImportacionMarca(20,40);
        // $this->ejecutarImportacionMarca(40,64);
        $this->ejecutarImportacionMarca(64,65);
        // importacion completada

        die('revisar phpmyadmin!!!!!!');
    }

    // /**
    //  * @Route("/importar/repuestos", name="descargar_categoria")
    // */
    public function importarRepuestosAction(){
        
        $cantidad = 21; //sacado a ojo mirando la cantidad de filas insertadas,todo automatizar
        // $this->ejecutarImportacion(0,1);
        // $this->ejecutarImportacion(1,2);
        // $this->ejecutarImportacion(1,11);
        // $this->ejecutarImportacion(12,15);
        // $this->ejecutarImportacion(15,21);
        // importacion completada

        die('revisar phpmyadmin!!!!!!');
    }

    private function ejecutarImportacionMarca($desde,$hasta){
        for($i=$desde;$i<$hasta;$i++){
            $path = './../mla/marca_auto_'. $i .'.json';
            // dump($path);
            $json = $this->leerArchivo($path);
            $this->guardarMarcaAuto($json);
            // dump($json);
        }
    }

    private function guardarMarcaAuto($json){
        $mlaTipoRepuesto = $json['id'];
        $name = $json['name'];
        // dump($name);
        $modelos = $json['children_categories'];    
    
        $entityManager = $this->getDoctrine()->getManager();

        $repository = $this->getDoctrine()->getRepository(MarcaAuto::class);
        $marca = $repository->findOneBy(
            [
                'mlaId' => $mlaTipoRepuesto
            ]
        );
        // dump($marca);die;

        if(empty($modelos)){

            $modelo = new ModeloAuto();
            $modelo->setMarcaAuto($marca);
            $modelo->setName($name);
            $modelo->setMlaId($mlaTipoRepuesto);
            $this->guardarRep($modelo,$entityManager);
        }
        else {
            foreach($modelos as $r){
                $modelo = new ModeloAuto();
                $modelo->setMarcaAuto($marca);
                // dump($r);
                $modelo->setMlaId($r['id']);
                $descripcion = $r['name'];
                if($descripcion == "Otros") {
                    $modelo->setName($name . ' - ' . $descripcion);
                } else {
                    $modelo->setName($descripcion);
                }
                $this->guardarRep($modelo,$entityManager);
            }
        }
    }

    private function ejecutarImportacion($desde,$hasta){
        for($i=$desde;$i<$hasta;$i++){
            $path = './../mla/repuesto_'. $i .'.json';
            dump($path);
            $json = $this->leerArchivo($path);
            $this->guardarRepuesto($json);
            // dump($json);
        }
    }

    private function guardarRepuesto($json){
        $mlaTipoRepuesto = $json['id'];
        $name = $json['name'];
        // dump($name);
        $repuestos = $json['children_categories'];    
    
        $entityManager = $this->getDoctrine()->getManager();

        $repository = $this->getDoctrine()->getRepository(TipoRepuesto::class);
        $tipoRepuesto = $repository->findOneBy(
            [
                'mlaId' => $mlaTipoRepuesto
            ]
        );
        // dump($tipoRepuesto);die;

        if(empty($repuestos)){

            $repuesto = new Repuesto();
            $repuesto->setTipoRepuesto($tipoRepuesto);
            $repuesto->setName($name);
            $repuesto->setMlaId($mlaTipoRepuesto);
            $this->guardarRep($repuesto,$entityManager);
        }
        else {
            foreach($repuestos as $r){
                $repuesto = new Repuesto();
                $repuesto->setTipoRepuesto($tipoRepuesto);
                // dump($r);
                $repuesto->setMlaId($r['id']);
                $descripcion = $r['name'];
                if($descripcion == "Otros") {
                    $repuesto->setName($name . ' - ' . $descripcion);
                } else {
                    $repuesto->setName($descripcion);
                }
                $this->guardarRep($repuesto,$entityManager);
            }
        }
    }

    private function guardarRep($respuesto,$entityManager) {
        $entityManager->persist($respuesto);
        $entityManager->flush();
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
