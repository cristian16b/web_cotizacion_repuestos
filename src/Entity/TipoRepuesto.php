<?php

namespace App\Entity;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TipoRepuestoRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class TipoRepuesto
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
     * @ORM\OneToMany(targetEntity="App\Entity\Repuesto", mappedBy="tipoRepuesto",cascade={"persist"})
     */
    private $repuestos;


    public function __construct()
    {
        $this->repuestos = new ArrayCollection();
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

    /**
     * @return Collection|Repuesto[]
     */
    public function getRepuestos(): Collection
    {
        return $this->repuestos;
    }

    public function addRepuesto(Repuesto $repuesto): self
    {
        if (!$this->repuestos->contains($repuesto)) {
            $this->repuestos[] = $repuesto;
            $repuesto->setTipoRepuesto($this);
        }

        return $this;
    }

    public function removeRepuesto(Repuesto $repuesto): self
    {
        if ($this->repuestos->contains($repuesto)) {
            $this->repuestos->removeElement($repuesto);
            // set the owning side to null (unless already changed)
            if ($repuesto->getTipoRepuesto() === $this) {
                $repuesto->setTipoRepuesto(null);
            }
        }

        return $this;
    }
}
