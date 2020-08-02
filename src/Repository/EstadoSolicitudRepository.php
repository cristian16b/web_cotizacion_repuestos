<?php

namespace App\Repository;

use App\Entity\EstadoSolicitud;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EstadoSolicitud|null find($id, $lockMode = null, $lockVersion = null)
 * @method EstadoSolicitud|null findOneBy(array $criteria, array $orderBy = null)
 * @method EstadoSolicitud[]    findAll()
 * @method EstadoSolicitud[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstadoSolicitudRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EstadoSolicitud::class);
    }

    // /**
    //  * @return EstadoSolicitud[] Returns an array of EstadoSolicitud objects
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
    public function findOneBySomeField($value): ?EstadoSolicitud
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
