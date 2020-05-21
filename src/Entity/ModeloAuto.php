<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModeloAutoRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class ModeloAuto
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
     * @ORM\Column(type="string", length=255)
     */
    private $mlaId;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MarcaAuto", mappedBy="modeloAuto")
     */
    private $marcaAuto;

    public function __construct()
    {
        $this->marcaAuto = new ArrayCollection();
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

    public function getMlaId(): ?string
    {
        return $this->mlaId;
    }

    public function setMlaId(string $mlaId): self
    {
        $this->mlaId = $mlaId;

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

    /**
     * @return Collection|MarcaAuto[]
     */
    public function getMarcaAuto(): Collection
    {
        return $this->marcaAuto;
    }

    public function addMarcaAuto(MarcaAuto $marcaAuto): self
    {
        if (!$this->marcaAuto->contains($marcaAuto)) {
            $this->marcaAuto[] = $marcaAuto;
            $marcaAuto->setModeloAuto($this);
        }

        return $this;
    }

    public function removeMarcaAuto(MarcaAuto $marcaAuto): self
    {
        if ($this->marcaAuto->contains($marcaAuto)) {
            $this->marcaAuto->removeElement($marcaAuto);
            // set the owning side to null (unless already changed)
            if ($marcaAuto->getModeloAuto() === $this) {
                $marcaAuto->setModeloAuto(null);
            }
        }

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
}
