<?php

namespace App\Entity;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SolicitudRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="modelo_auto_id", columns={"modelo_auto_id"}),
 *   @ORM\Index(name="solicitante_id", columns={"solicitante_id"}),
 *   @ORM\Index(name="repuesto_id", columns={"repuesto_id"}),
 *   @ORM\Index(name="estado_id", columns={"estado_id"}),
 * })
 */
class Solicitud
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Expose
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=false)
     * @Assert\Length(
     *      min = 10,
     *      max = 255,
     *      minMessage = "Debes ingresar una observación de al menos 10 carácteres",
     *      maxMessage = "La observación es muy larga",
     *      allowEmptyString = false
     * )
     * @Expose
     */
    private $observacion;

    /**
     * @ORM\Column(type="date")
     * @Expose
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ModeloAuto", cascade={"persist", "remove"})
     * @Assert\NotBlank(message="Debe seleccionar la marca y modelo de su auto")
     * @Expose
     */
    private $modeloAuto;


    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoSolicitud", mappedBy="solicitud", orphanRemoval=true, cascade={"persist", "remove"})
     * @Assert\NotBlank(message="Debe cargar al menos una imagen y a lo sumo 4")
     * @Expose
     */
    private $recursos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cotizacion", mappedBy="solicitud")
     * @Expose
     */
    private $cotizaciones;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Usuario", inversedBy="solicitudesCotizacion")
     * @ORM\JoinColumn(nullable=false)
     */
    private $solicitante;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Repuesto", inversedBy="solicitudes")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Debe seleccionar su repuesto")
     * @Expose
     */
    private $repuesto;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\EstadoSolicitud", inversedBy="solicituds")
     * @ORM\JoinColumn(nullable=false)
     */
    private $estado;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Compra", mappedBy="solicitud")
     */
    private $compras;

    public function __construct()
    {
        $this->recursos = new ArrayCollection();
        $this->cotizaciones = new ArrayCollection();
        $this->compras = new ArrayCollection();
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

    public function getModeloAuto(): ?ModeloAuto
    {
        return $this->modeloAuto;
    }

    public function setModeloAuto(?ModeloAuto $modeloAuto): self
    {
        $this->modeloAuto = $modeloAuto;

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

    public function getSolicitante(): ?Usuario
    {
        return $this->solicitante;
    }

    public function setSolicitante(?Usuario $solicitante): self
    {
        $this->solicitante = $solicitante;

        return $this;
    }

    public function getRepuesto(): ?Repuesto
    {
        return $this->repuesto;
    }

    public function setRepuesto(?Repuesto $repuesto): self
    {
        $this->repuesto = $repuesto;

        return $this;
    }

    public function getEstado(): ?EstadoSolicitud
    {
        return $this->estado;
    }

    public function setEstado(?EstadoSolicitud $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * @return Collection|Compra[]
     */
    public function getCompras(): Collection
    {
        return $this->compras;
    }

    public function addCompra(Compra $compra): self
    {
        if (!$this->compras->contains($compra)) {
            $this->compras[] = $compra;
            $compra->setSolicitud($this);
        }

        return $this;
    }

    public function removeCompra(Compra $compra): self
    {
        if ($this->compras->contains($compra)) {
            $this->compras->removeElement($compra);
            // set the owning side to null (unless already changed)
            if ($compra->getSolicitud() === $this) {
                $compra->setSolicitud(null);
            }
        }

        return $this;
    }
}
