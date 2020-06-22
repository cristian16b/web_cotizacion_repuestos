<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LocalidadRepository")
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
}
