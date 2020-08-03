<?php

namespace App\Repository;

use App\Entity\Solicitud;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Solicitud|null find($id, $lockMode = null, $lockVersion = null)
 * @method Solicitud|null findOneBy(array $criteria, array $orderBy = null)
 * @method Solicitud[]    findAll()
 * @method Solicitud[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SolicitudRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Solicitud::class);
    }

    public function filtrarSolicitudes($repuesto,$marca,$modelo) {
        // dump($repuesto != 'undefined');dump($marca != 'undefined');dump($modelo != 'undefined');
        $query = $this->createQueryBuilder('s')
                        ->innerJoin('s.repuesto','r','WITH','r.fechaBaja IS null')
                        ->innerJoin('s.modeloAuto','modelo','WITH','modelo.fechaBaja IS null')
                        ->innerJoin('modelo.marcaAuto','marca','WITH','marca.fechaBaja IS null')
                        ->where('s.fechaBaja is null')
                        ->orderBy('s.fechaAlta', 'DESC')
                        ->setMaxResults(100)
                    ;
        if($repuesto != 'undefined') {
            $query->andWhere('r.id = :idRepuesto');
            $query->setParameter('idRepuesto',$repuesto);
        }
        if($modelo != 'undefined') {
            $query->andWhere('modelo.id = :idModeloAuto');
            $query->setParameter('idModeloAuto',$modelo);
        }
        if($marca != 'undefined') {
            $query->andWhere('marca.id = :idMarca');
            $query->setParameter('idMarca',$marca);
        }
        return $query->getQuery()->getResult();
    }

    public function buscarUltimas() {
        return $this->createQueryBuilder('s')
            ->where('s.fechaBaja is null')
            ->orderBy('s.fechaAlta', 'DESC')
            ->setMaxResults(40)
            ->getQuery()
            ->getResult()
        ;
    }

    public function buscarUltimasPorId($usuario) {
        return $this->createQueryBuilder('s')
            ->innerJoin('s.solicitante','u','WITH','u.fechaBaja IS null')
            ->where('s.fechaBaja is null')
            ->andWhere('s.solicitante = :usuario')
            ->setParameter('usuario', $usuario)
            ->orderBy('s.fechaAlta', 'DESC')
            ->setMaxResults(20)
            ->getQuery()
            ->getResult()
        ;
    }

    public function buscarUltimasPorNombreRepuesto($usuario,$name) {
        return $this->createQueryBuilder('s')
            ->innerJoin('s.solicitante','u','WITH','u.fechaBaja IS null')
            ->innerJoin('s.repuesto','r','WITH','r.fechaBaja IS null')
            ->where('s.fechaBaja is null')
            ->andWhere('s.solicitante = :usuario')
            ->andWhere('r.name LIKE :repuestoIngresado')
            ->setParameter('usuario', $usuario)
            ->setParameter('repuestoIngresado','%' . $name . '%')
            ->orderBy('s.fechaAlta', 'DESC')
            ->setMaxResults(20)
            ->getQuery()
            ->getResult()
        ;
    }
 
    // /**
    //  * @return Solicitud[] Returns an array of Solicitud objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Solicitud
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
