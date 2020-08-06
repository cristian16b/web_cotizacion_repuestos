<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EstadoSolicitudRepository")
 */
class EstadoSolicitud
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
    private $descripcion;

    /**
     * @ORM\Column(type="date",nullable=true)
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaBaja;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Solicitud", mappedBy="estado")
     */
    private $solicituds;

    public function __construct()
    {
        $this->solicituds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;

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

    public function setFechaBaja(\DateTimeInterface $fechaBaja): self
    {
        $this->fechaBaja = $fechaBaja;

        return $this;
    }

    /**
     * @return Collection|Solicitud[]
     */
    public function getSolicituds(): Collection
    {
        return $this->solicituds;
    }

    public function addSolicitud(Solicitud $solicitud): self
    {
        if (!$this->solicituds->contains($solicitud)) {
            $this->solicituds[] = $solicitud;
            $solicitud->setEstado($this);
        }

        return $this;
    }

    public function removeSolicitud(Solicitud $solicitud): self
    {
        if ($this->solicituds->contains($solicitud)) {
            $this->solicituds->removeElement($solicitud);
            // set the owning side to null (unless already changed)
            if ($solicitud->getEstado() === $this) {
                $solicitud->setEstado(null);
            }
        }

        return $this;
    }
}
