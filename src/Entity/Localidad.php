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
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Provincia", inversedBy="localidads")
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
            $domicilio->setName($this);
        }

        return $this;
    }

    public function removeDomicilio(Domicilio $domicilio): self
    {
        if ($this->domicilios->contains($domicilio)) {
            $this->domicilios->removeElement($domicilio);
            // set the owning side to null (unless already changed)
            if ($domicilio->getName() === $this) {
                $domicilio->setName(null);
            }
        }

        return $this;
    }
}
