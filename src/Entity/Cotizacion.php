<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CotizacionRepository")
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
     * @ORM\OneToOne(targetEntity="App\Entity\EstadoCotizacion", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $estado;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Solicitud", mappedBy="cotizaciones")
     */
    private $solicitud;

    public function __construct()
    {
        $this->solicitud = new ArrayCollection();
    }

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
     * @return Collection|Solicitud[]
     */
    public function getSolicitud(): Collection
    {
        return $this->solicitud;
    }

    public function addSolicitud(Solicitud $solicitud): self
    {
        if (!$this->solicitud->contains($solicitud)) {
            $this->solicitud[] = $solicitud;
            $solicitud->setCotizaciones($this);
        }

        return $this;
    }

    public function removeSolicitud(Solicitud $solicitud): self
    {
        if ($this->solicitud->contains($solicitud)) {
            $this->solicitud->removeElement($solicitud);
            // set the owning side to null (unless already changed)
            if ($solicitud->getCotizaciones() === $this) {
                $solicitud->setCotizaciones(null);
            }
        }

        return $this;
    }
}
