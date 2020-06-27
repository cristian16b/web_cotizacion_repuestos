<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LocalidadRepository")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="provincia_id", columns={"provincia_id"}),
 * })
 */
class Localidad
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
    private $localidad;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\provincia", inversedBy="localidads")
     * @ORM\JoinColumn(nullable=false)
     */
    private $provincia;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Domicilio", mappedBy="localidad")
     */
    private $domicilios;

    public function __construct()
    {
        $this->domicilios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocalidad(): ?string
    {
        return $this->localidad;
    }

    public function setLocalidad(string $localidad): self
    {
        $this->localidad = $localidad;

        return $this;
    }

    public function getProvincia(): ?provincia
    {
        return $this->provincia;
    }

    public function setProvincia(?provincia $provincia): self
    {
        $this->provincia = $provincia;

        return $this;
    }

    /**
     * @return Collection|Domicilio[]
     */
    public function getDomicilios(): Collection
    {
        return $this->domicilios;
    }

    public function addDomicilio(Domicilio $domicilio): self
    {
        if (!$this->domicilios->contains($domicilio)) {
            $this->domicilios[] = $domicilio;
            $domicilio->setLocalidad($this);
        }

        return $this;
    }

    public function removeDomicilio(Domicilio $domicilio): self
    {
        if ($this->domicilios->contains($domicilio)) {
            $this->domicilios->removeElement($domicilio);
            // set the owning side to null (unless already changed)
            if ($domicilio->getLocalidad() === $this) {
                $domicilio->setLocalidad(null);
            }
        }

        return $this;
    }
}
