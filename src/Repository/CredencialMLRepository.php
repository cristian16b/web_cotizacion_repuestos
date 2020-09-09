<?php

namespace App\Repository;

use App\Entity\CredencialML;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CredencialML|null find($id, $lockMode = null, $lockVersion = null)
 * @method CredencialML|null findOneBy(array $criteria, array $orderBy = null)
 * @method CredencialML[]    findAll()
 * @method CredencialML[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CredencialMLRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CredencialML::class);
    }

    // /**
    //  * @return CredencialML[] Returns an array of CredencialML objects
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
    public function findOneBySomeField($value): ?CredencialML
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
