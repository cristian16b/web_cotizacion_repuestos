<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecursoSolicitudRepository")
 */
class RecursoSolicitud
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombreLogico;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombreFisico;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pesoMega;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Solicitud", inversedBy="recursos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $solicitud;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombreLogico(): ?string
    {
        return $this->nombreLogico;
    }

    public function setNombreLogico(string $nombreLogico): self
    {
        $this->nombreLogico = $nombreLogico;

        return $this;
    }

    public function getNombreFisico(): ?string
    {
        return $this->nombreFisico;
    }

    public function setNombreFisico(string $nombreFisico): self
    {
        $this->nombreFisico = $nombreFisico;

        return $this;
    }

    public function getFechaAlta(): ?\DateTimeInterface
    {
        return $this->fechaAlta;
    }

    public function setFechaAlta(\DateTimeInterface $fechaAlta): self
    {
        $this->fechaAlta = $fechaAlta;

        return $this;
    }

    public function getFechaBaja(): ?\DateTimeInterface
    {
        return $this->fechaBaja;
    }

    public function setFechaBaja(?\DateTimeInterface $fechaBaja): self
    {
        $this->fechaBaja = $fechaBaja;

        return $this;
    }

    public function getPesoMega(): ?string
    {
        return $this->pesoMega;
    }

    public function setPesoMega(string $pesoMega): self
    {
        $this->pesoMega = $pesoMega;
    
        return $this;
    }

    public function getSolicitud(): ?Solicitud
    {
        return $this->solicitud;
    }

    public function setSolicitud(?Solicitud $solicitud): self
    {
        $this->solicitud = $solicitud;

        return $this;
    }
}
