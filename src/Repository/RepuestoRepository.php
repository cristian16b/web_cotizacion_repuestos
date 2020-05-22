<?php

namespace App\Repository;

use App\Entity\Repuesto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Repuesto|null find($id, $lockMode = null, $lockVersion = null)
 * @method Repuesto|null findOneBy(array $criteria, array $orderBy = null)
 * @method Repuesto[]    findAll()
 * @method Repuesto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RepuestoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Repuesto::class);
    }

    // /**
    //  * @return Repuesto[] Returns an array of Repuesto objects
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
    public function findOneBySomeField($value): ?Repuesto
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
