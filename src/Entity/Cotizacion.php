<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CotizacionRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
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
     * @ORM\ManyToOne(targetEntity="App\Entity\EstadoCotizacion")
     * @ORM\JoinColumn(nullable=false)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Solicitud", inversedBy="cotizaciones")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $solicitud;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Usuario", inversedBy="cotizacionesRealizadas")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $oferente;

    /**
     * @ORM\Column(type="date")
     * @Expose
     */
    private $fechaLimiteValidez;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    private $observacion;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoCotizacion", mappedBy="cotizacion", orphanRemoval=true, cascade={"persist", "remove"})
     * @Assert\NotBlank(message="Debe cargar al menos una imagen y a lo sumo 4")
     * @Expose
     */
    private $recursoCotizacions;

    public function __construct()
    {
        $this->recursoCotizacions = new ArrayCollection();
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

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(?string $observacion): self
    {
        $this->observacion = $observacion;

        return $this;
    }

    /**
     * @return Collection|RecursoCotizacion[]
     */
    public function getRecursoCotizacions(): Collection
    {
        return $this->recursoCotizacions;
    }

    public function addRecursoCotizacion(RecursoCotizacion $recursoCotizacion): self
    {
        if (!$this->recursoCotizacions->contains($recursoCotizacion)) {
            $this->recursoCotizacions[] = $recursoCotizacion;
            $recursoCotizacion->setCotizacion($this);
        }

        return $this;
    }

    public function removeRecursoCotizacion(RecursoCotizacion $recursoCotizacion): self
    {
        if ($this->recursoCotizacions->contains($recursoCotizacion)) {
            $this->recursoCotizacions->removeElement($recursoCotizacion);
            // set the owning side to null (unless already changed)
            if ($recursoCotizacion->getCotizacion() === $this) {
                $recursoCotizacion->setCotizacion(null);
            }
        }

        return $this;
    }
}
