<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CotizacionRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(indexes={
 *   @ORM\Index(name="estado_id", columns={"estado_id"}),
 *   @ORM\Index(name="oferente_id", columns={"oferente_id"}),
 *   @ORM\Index(name="solicitud_id", columns={"solicitud_id"})
 * })
 */
class Cotizacion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="float")
     */
    private $monto;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\EstadoCotizacion")
     * @ORM\JoinColumn(nullable=false)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Solicitud", inversedBy="cotizaciones")
     * @ORM\JoinColumn(nullable=false)
     */
    private $solicitud;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Usuario", inversedBy="cotizacionesRealizadas")
     * @ORM\JoinColumn(nullable=false)
     */
    private $oferente;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaLimiteValidez;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getMonto(): ?float
    {
        return $this->monto;
    }

    public function setMonto(float $monto): self
    {
        $this->monto = $monto;

        return $this;
    }

    public function getEstado(): ?EstadoCotizacion
    {
        return $this->estado;
    }

    public function setEstado(EstadoCotizacion $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updatedTimestamps()
    {
        $dateTimeNow = new DateTime('now');
        $this->setFechaAlta($dateTimeNow);
        if ($this->getFechaAlta() === null) {
            $this->setFechaAlta($dateTimeNow);
        }
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

    public function getOferente(): ?Usuario
    {
        return $this->oferente;
    }

    public function setOferente(?Usuario $oferente): self
    {
        $this->oferente = $oferente;

        return $this;
    }

    public function getFechaLimiteValidez()
    {
        return $this->fechaLimiteValidez;
    }

    public function setFechaLimiteValidez($fechaLimiteValidez)
    {
        $this->fechaLimiteValidez = $fechaLimiteValidez;

        return $this;
    }
}
