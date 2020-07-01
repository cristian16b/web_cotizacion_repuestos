<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DomicilioRepository")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="localidad_id", columns={"localidad_id"}),
 * })
 */
class Domicilio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Debes completar el nombre de tu calle")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="El nombre de la calle debe tener al menos dos letras",
     *     max = 100,
     *     maxMessage="El nombre de la calle no puede tener una longitud mayor a 100 letras"
     * )
     */
    private $calle;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Debes completar el nro de tu domicilio")
     */
    private $numero;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Persona", mappedBy="domicilio")
     */
    private $personas;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\localidad", inversedBy="domicilios")
     */
    private $localidad;

    public function __construct()
    {
        $this->personas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCalle(): ?string
    {
        return $this->calle;
    }

    public function setCalle(string $calle): self
    {
        $this->calle = $calle;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getLocalidad(): ?string
    {
        return $this->localidad;
    }

    public function setLocalidad($localidad): self
    {
        $this->localidad = $localidad;

        return $this;
    }

    /**
     * @return Collection|Persona[]
     */
    public function getPersonas(): Collection
    {
        return $this->personas;
    }

    public function addPersona(Persona $persona): self
    {
        if (!$this->personas->contains($persona)) {
            $this->personas[] = $persona;
            $persona->setDomicilio($this);
        }

        return $this;
    }

    public function removePersona(Persona $persona): self
    {
        if ($this->personas->contains($persona)) {
            $this->personas->removeElement($persona);
            // set the owning side to null (unless already changed)
            if ($persona->getDomicilio() === $this) {
                $persona->setDomicilio(null);
            }
        }

        return $this;
    }
}
