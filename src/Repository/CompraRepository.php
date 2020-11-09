<?php

namespace App\Repository;

use App\Entity\Compra;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Compra|null find($id, $lockMode = null, $lockVersion = null)
 * @method Compra|null findOneBy(array $criteria, array $orderBy = null)
 * @method Compra[]    findAll()
 * @method Compra[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompraRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Compra::class);
    }

    public function buscarUltimasPorUsuario($usuario,$page = 1, $limit = 3) {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.solicitud','s','WITH','s.fechaBaja IS null')
            ->innerJoin('s.estado','es','WITH','es.fechaBaja IS null')
            ->innerJoin('c.estado','e','WITH','e.fechaBaja IS null')
            ->where('c.fechaBaja is null')
            ->andWhere('s.solicitante = :usuario')
            ->andWhere('e.descripcion like ' ."'ENVIADA'")
            ->andWhere('es.descripcion like ' ."'FINALIZADA'")
            ->setParameter('usuario', $usuario)
            ->orderBy('s.id', 'DESC')
            ->setMaxResults(100)
            // ->setFirstResult($limit * ($page - 1)) // Offset
            // ->setMaxResults($limit) // Limit
            ->getQuery()
            ->getResult()
        ;
    }

    // /**
    //  * @return Compra[] Returns an array of Compra objects
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
    public function findOneBySomeField($value): ?Compra
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
