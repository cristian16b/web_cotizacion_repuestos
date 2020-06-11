<?php

namespace App\Repository;

use App\Entity\ModeloAuto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ModeloAuto|null find($id, $lockMode = null, $lockVersion = null)
 * @method ModeloAuto|null findOneBy(array $criteria, array $orderBy = null)
 * @method ModeloAuto[]    findAll()
 * @method ModeloAuto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ModeloAutoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ModeloAuto::class);
    }

    public function buscarPorNombre($value,$id)
    {
        return $this->createQueryBuilder('r')
            ->innerJoin('r.marcaAuto','m')
            ->andWhere('r.name LIKE :val')
            ->andWhere('m.id = :id')
            ->andWhere('r.fechaBaja IS null')
            ->setParameter('val','%'. $value . '%')
            ->setParameter('id',$id)
            ->orderBy('r.name', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    // /**
    //  * @return ModeloAuto[] Returns an array of ModeloAuto objects
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
    public function findOneBySomeField($value): ?ModeloAuto
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
