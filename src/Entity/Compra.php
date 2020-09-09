<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTime;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CompraRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */
class Compra
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Expose
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Expose
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="float")
     * @Expose
     */
    private $monto;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $idPagoML;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $estadoPagoML;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $referenciaExterna;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $preferenciaIdML;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $referenciaExternaML;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $estadoML;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $estadoDetalleML;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Expose
     */
    private $tipoPagoML;

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

    public function getIdPagoML(): ?string
    {
        return $this->idPagoML;
    }

    public function setIdPagoML(string $idPagoML): self
    {
        $this->idPagoML = $idPagoML;

        return $this;
    }

    public function getEstadoPagoML(): ?string
    {
        return $this->estadoPagoML;
    }

    public function setEstadoPagoML(string $estadoPagoML): self
    {
        $this->estadoPagoML = $estadoPagoML;

        return $this;
    }

    public function getReferenciaExterna(): ?string
    {
        return $this->referenciaExterna;
    }

    public function setReferenciaExterna(?string $referenciaExterna): self
    {
        $this->referenciaExterna = $referenciaExterna;

        return $this;
    }

    public function getPreferenciaIdML(): ?string
    {
        return $this->preferenciaIdML;
    }

    public function setPreferenciaIdML(string $preferenciaIdML): self
    {
        $this->preferenciaIdML = $preferenciaIdML;

        return $this;
    }

    public function getReferenciaExternaML(): ?string
    {
        return $this->referenciaExternaML;
    }

    public function setReferenciaExternaML(string $referenciaExternaML): self
    {
        $this->referenciaExternaML = $referenciaExternaML;

        return $this;
    }

    public function getEstadoML(): ?string
    {
        return $this->estadoML;
    }

    public function setEstadoML(string $estadoML): self
    {
        $this->estadoML = $estadoML;

        return $this;
    }

    public function getEstadoDetalleML(): ?string
    {
        return $this->estadoDetalleML;
    }

    public function setEstadoDetalleML(string $estadoDetalleML): self
    {
        $this->estadoDetalleML = $estadoDetalleML;

        return $this;
    }

    public function getTipoPagoML(): ?string
    {
        return $this->tipoPagoML;
    }

    public function setTipoPagoML(?string $tipoPagoML): self
    {
        $this->tipoPagoML = $tipoPagoML;

        return $this;
    }
}
