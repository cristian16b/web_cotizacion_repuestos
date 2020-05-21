<?php

namespace App\Repository;

use App\Entity\Recursos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Recursos|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recursos|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recursos[]    findAll()
 * @method Recursos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecursosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recursos::class);
    }

    // /**
    //  * @return Recursos[] Returns an array of Recursos objects
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
    public function findOneBySomeField($value): ?Recursos
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
