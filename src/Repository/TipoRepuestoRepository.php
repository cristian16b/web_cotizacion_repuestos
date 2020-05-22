<?php

namespace App\Repository;

use App\Entity\TipoRepuesto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TipoRepuesto|null find($id, $lockMode = null, $lockVersion = null)
 * @method TipoRepuesto|null findOneBy(array $criteria, array $orderBy = null)
 * @method TipoRepuesto[]    findAll()
 * @method TipoRepuesto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TipoRepuestoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TipoRepuesto::class);
    }

    public function findOneByMla($value): ?TipoRepuesto
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.mlaId = :val')
            ->setParameter('val', '%'. $value . '%')
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    // /**
    //  * @return TipoRepuesto[] Returns an array of TipoRepuesto objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TipoRepuesto
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
