<?php

namespace App\Repository;

use App\Entity\EstadoCotizacion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EstadoCotizacion|null find($id, $lockMode = null, $lockVersion = null)
 * @method EstadoCotizacion|null findOneBy(array $criteria, array $orderBy = null)
 * @method EstadoCotizacion[]    findAll()
 * @method EstadoCotizacion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstadoCotizacionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EstadoCotizacion::class);
    }

    // /**
    //  * @return EstadoCotizacion[] Returns an array of EstadoCotizacion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EstadoCotizacion
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
