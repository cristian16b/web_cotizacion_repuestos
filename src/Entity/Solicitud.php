<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SolicitudRepository")
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
     * @ORM\ManyToOne(targetEntity="App\Entity\RecursoSolicitud", inversedBy="solicitud")
     */
    private $recursoSolicitud;

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

    public function getRecursoSolicitud(): ?RecursoSolicitud
    {
        return $this->recursoSolicitud;
    }

    public function setRecursoSolicitud(?RecursoSolicitud $recursoSolicitud): self
    {
        $this->recursoSolicitud = $recursoSolicitud;

        return $this;
    }
}
