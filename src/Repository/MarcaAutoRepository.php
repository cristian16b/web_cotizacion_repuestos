<?php

namespace App\Repository;

use App\Entity\MarcaAuto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MarcaAuto|null find($id, $lockMode = null, $lockVersion = null)
 * @method MarcaAuto|null findOneBy(array $criteria, array $orderBy = null)
 * @method MarcaAuto[]    findAll()
 * @method MarcaAuto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarcaAutoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MarcaAuto::class);
    }

    // /**
    //  * @return MarcaAuto[] Returns an array of MarcaAuto objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MarcaAuto
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
