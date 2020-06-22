<?php

namespace App\Repository;

use App\Entity\Domicilio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Domicilio|null find($id, $lockMode = null, $lockVersion = null)
 * @method Domicilio|null findOneBy(array $criteria, array $orderBy = null)
 * @method Domicilio[]    findAll()
 * @method Domicilio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DomicilioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Domicilio::class);
    }

    // /**
    //  * @return Domicilio[] Returns an array of Domicilio objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Domicilio
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
