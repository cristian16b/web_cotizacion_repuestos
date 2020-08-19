<?php

namespace App\Repository;

use App\Entity\RecursoCotizacion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RecursoCotizacion|null find($id, $lockMode = null, $lockVersion = null)
 * @method RecursoCotizacion|null findOneBy(array $criteria, array $orderBy = null)
 * @method RecursoCotizacion[]    findAll()
 * @method RecursoCotizacion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecursoCotizacionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RecursoCotizacion::class);
    }

    // /**
    //  * @return RecursoCotizacion[] Returns an array of RecursoCotizacion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RecursoCotizacion
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
