<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProvinciaRepository")
 * @ExclusionPolicy("all")
 */
class Provincia
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
     * @ORM\OneToMany(targetEntity="App\Entity\Localidad", mappedBy="provincia")
     */
    private $localidads;

    public function __construct()
    {
        $this->localidads = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $Name): self
    {
        $this->name = $Name;

        return $this;
    }

    /**
     * @return Collection|Localidad[]
     */
    public function getLocalidads(): Collection
    {
        return $this->localidads;
    }

    public function addLocalidad(Localidad $localidad): self
    {
        if (!$this->localidads->contains($localidad)) {
            $this->localidads[] = $localidad;
            $localidad->setName($this);
        }

        return $this;
    }

    public function removeLocalidad(Localidad $localidad): self
    {
        if ($this->localidads->contains($localidad)) {
            $this->localidads->removeElement($localidad);
            // set the owning side to null (unless already changed)
            if ($localidad->getName() === $this) {
                $localidad->setName(null);
            }
        }

        return $this;
    }
}
