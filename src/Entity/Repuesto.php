<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RepuestoRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="tipo_repuesto_id", columns={"tipo_repuesto_id"})
 * })
 */
class Repuesto
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Expose
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $name;

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
    private $mlaId;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoRepuesto", inversedBy="repuestos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tipoRepuesto;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Solicitud", mappedBy="repuesto")
     */
    private $solicitudes;

    public function __construct()
    {
        $this->solicitudes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getMlaId(): ?string
    {
        return $this->mlaId;
    }

    public function setMlaId(string $mlaId): self
    {
        $this->mlaId = $mlaId;

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

    public function getTipoRepuesto(): ?TipoRepuesto
    {
        return $this->tipoRepuesto;
    }

    public function setTipoRepuesto(?TipoRepuesto $tipoRepuesto): self
    {
        $this->tipoRepuesto = $tipoRepuesto;

        return $this;
    }

    /**
     * @return Collection|Solicitud[]
     */
    public function getSolicitudes(): Collection
    {
        return $this->solicitudes;
    }

    public function addSolicitude(Solicitud $solicitude): self
    {
        if (!$this->solicitudes->contains($solicitude)) {
            $this->solicitudes[] = $solicitude;
            $solicitude->setRepuesto($this);
        }

        return $this;
    }

    public function removeSolicitude(Solicitud $solicitude): self
    {
        if ($this->solicitudes->contains($solicitude)) {
            $this->solicitudes->removeElement($solicitude);
            // set the owning side to null (unless already changed)
            if ($solicitude->getRepuesto() === $this) {
                $solicitude->setRepuesto(null);
            }
        }

        return $this;
    }
}
