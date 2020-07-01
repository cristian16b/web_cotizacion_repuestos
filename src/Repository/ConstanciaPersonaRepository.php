<?php

namespace App\Repository;

use App\Entity\ConstanciaPersona;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ConstanciaPersona|null find($id, $lockMode = null, $lockVersion = null)
 * @method ConstanciaPersona|null findOneBy(array $criteria, array $orderBy = null)
 * @method ConstanciaPersona[]    findAll()
 * @method ConstanciaPersona[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConstanciaPersonaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ConstanciaPersona::class);
    }

    // /**
    //  * @return ConstanciaPersona[] Returns an array of ConstanciaPersona objects
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
    public function findOneBySomeField($value): ?ConstanciaPersona
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
