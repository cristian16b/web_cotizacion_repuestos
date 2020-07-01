<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TipoConstanciaRepository")
 */
class TipoConstancia
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
    private $nombre;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ConstanciaPersona", mappedBy="tipo")
     */
    private $constanciaPersonas;

    public function __construct()
    {
        $this->constanciaPersonas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * @return Collection|ConstanciaPersona[]
     */
    public function getConstanciaPersonas(): Collection
    {
        return $this->constanciaPersonas;
    }

    public function addConstanciaPersona(ConstanciaPersona $constanciaPersona): self
    {
        if (!$this->constanciaPersonas->contains($constanciaPersona)) {
            $this->constanciaPersonas[] = $constanciaPersona;
            $constanciaPersona->setTipo($this);
        }

        return $this;
    }

    public function removeConstanciaPersona(ConstanciaPersona $constanciaPersona): self
    {
        if ($this->constanciaPersonas->contains($constanciaPersona)) {
            $this->constanciaPersonas->removeElement($constanciaPersona);
            // set the owning side to null (unless already changed)
            if ($constanciaPersona->getTipo() === $this) {
                $constanciaPersona->setTipo(null);
            }
        }

        return $this;
    }
}
