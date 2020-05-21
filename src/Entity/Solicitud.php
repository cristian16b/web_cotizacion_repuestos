<?php

namespace App\Entity;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SolicitudRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Solicitud
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $observacion;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\TipoRepuesto", cascade={"persist", "remove"})
     */
    private $tipoRepuesto;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ModeloAuto", cascade={"persist", "remove"})
     */
    private $modeloAuto;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Compra", cascade={"persist", "remove"})
     */
    private $compra;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoSolicitud", mappedBy="solicitud", orphanRemoval=true)
     */
    private $recursos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cotizacion", mappedBy="solicitud")
     */
    private $cotizaciones;

    public function __construct()
    {
        $this->recursos = new ArrayCollection();
        $this->cotizaciones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(?string $observacion): self
    {
        $this->observacion = $observacion;

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

    public function getTipoRepuesto(): ?TipoRepuesto
    {
        return $this->tipoRepuesto;
    }

    public function setTipoRepuesto(?TipoRepuesto $tipoRepuesto): self
    {
        $this->tipoRepuesto = $tipoRepuesto;

        return $this;
    }

    public function getModeloAuto(): ?ModeloAuto
    {
        return $this->modeloAuto;
    }

    public function setModeloAuto(?ModeloAuto $modeloAuto): self
    {
        $this->modeloAuto = $modeloAuto;

        return $this;
    }

    public function getCompra(): ?Compra
    {
        return $this->compra;
    }

    public function setCompra(?Compra $compra): self
    {
        $this->compra = $compra;

        return $this;
    }

    /**
     * @return Collection|Recurso[]
     */
    public function getRecursos(): Collection
    {
        return $this->recursos;
    }

    public function addRecurso(RecursoSolicitud $recurso): self
    {
        if (!$this->recursos->contains($recurso)) {
            $this->recursos[] = $recurso;
            $recurso->setSolicitud($this);
        }

        return $this;
    }

    public function removeRecurso(RecursoSolicitud $recurso): self
    {
        if ($this->recursos->contains($recurso)) {
            $this->recursos->removeElement($recurso);
            // set the owning side to null (unless already changed)
            if ($recurso->getSolicitud() === $this) {
                $recurso->setSolicitud(null);
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

    /**
     * @return Collection|Cotizacion[]
     */
    public function getCotizaciones(): Collection
    {
        return $this->cotizaciones;
    }

    public function addCotizacione(Cotizacion $cotizacione): self
    {
        if (!$this->cotizaciones->contains($cotizacione)) {
            $this->cotizaciones[] = $cotizacione;
            $cotizacione->setSolicitud($this);
        }

        return $this;
    }

    public function removeCotizacione(Cotizacion $cotizacione): self
    {
        if ($this->cotizaciones->contains($cotizacione)) {
            $this->cotizaciones->removeElement($cotizacione);
            // set the owning side to null (unless already changed)
            if ($cotizacione->getSolicitud() === $this) {
                $cotizacione->setSolicitud(null);
            }
        }

        return $this;
    }
}
