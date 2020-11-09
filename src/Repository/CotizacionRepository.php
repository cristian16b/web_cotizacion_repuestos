<?php

namespace App\Repository;

use App\Entity\Cotizacion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Cotizacion|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cotizacion|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cotizacion[]    findAll()
 * @method Cotizacion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CotizacionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cotizacion::class);
    }

    public function buscarUltimasPorUsuario($usuario,$page = 1, $limit = 3) {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.solicitud','s','WITH','s.fechaBaja IS null')
            ->innerJoin('s.estado','es','WITH','es.fechaBaja IS null')
            ->innerJoin('c.estado','e','WITH','e.fechaBaja IS null')
            ->where('c.fechaBaja is null')
            ->andWhere('s.solicitante = :usuario')
            ->andWhere('e.descripcion like ' ."'ENVIADA'")
            ->andWhere('es.descripcion like ' ."'INICIADA'")
            ->setParameter('usuario', $usuario)
            ->orderBy('s.id', 'DESC')
            ->setMaxResults(30)
            // ->setFirstResult($limit * ($page - 1)) // Offset
            // ->setMaxResults($limit) // Limit
            ->getQuery()
            ->getResult()
        ;
    }

    public function buscarPreferenciaId($preference_id) {
        return $this->createQueryBuilder('c')
            ->andWhere('c.preferencia LIKE :val')
            ->setParameter('val', '%'.$preference_id.'%')
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }


    // /**
    //  * @return Cotizacion[] Returns an array of Cotizacion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cotizacion
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
