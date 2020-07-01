<?php

namespace App\Repository;

use App\Entity\TipoConstancia;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TipoConstancia|null find($id, $lockMode = null, $lockVersion = null)
 * @method TipoConstancia|null findOneBy(array $criteria, array $orderBy = null)
 * @method TipoConstancia[]    findAll()
 * @method TipoConstancia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TipoConstanciaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TipoConstancia::class);
    }

    // /**
    //  * @return TipoConstancia[] Returns an array of TipoConstancia objects
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
    public function findOneBySomeField($value): ?TipoConstancia
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
