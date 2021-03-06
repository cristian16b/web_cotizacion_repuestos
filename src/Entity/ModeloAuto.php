<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModeloAutoRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
  * @ORM\Table(indexes={
 *   @ORM\Index(name="marca_auto_id", columns={"marca_auto_id"}),
 * })
 */
class ModeloAuto
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
     * @ORM\ManyToOne(targetEntity="App\Entity\MarcaAuto", inversedBy="modelos")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
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

    public function getMarcaAuto()
    {
        return $this->marcaAuto;
    }

    public function setMarcaAuto(?MarcaAuto $marcaAuto): self
    {
        $this->marcaAuto = $marcaAuto;

        return $this;
    }

    public function toString() {
        $marca = $this->marcaAuto->getName();
        return "Marca: " . $marca . " Modelo: " .$this->name;
    }
}
