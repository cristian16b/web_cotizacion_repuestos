<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTime;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;


/**
 * @ORM\Entity(repositoryClass="App\Repository\CredencialMLRepository")
 * @ExclusionPolicy("all")
 * @ORM\HasLifecycleCallbacks()
 */
class CredencialML
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
    private $tokenAcceso;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $clavePublica;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tokenActualizar;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaUltimaActualizacion;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\usuario")
     * @ORM\JoinColumn(nullable=false)
     */
    private $usuario;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTokenAcceso(): ?string
    {
        return $this->tokenAcceso;
    }

    public function setTokenAcceso(string $tokenAcceso): self
    {
        $this->tokenAcceso = $tokenAcceso;

        return $this;
    }

    public function getClavePublica(): ?string
    {
        return $this->clavePublica;
    }

    public function setClavePublica(string $clavePublica): self
    {
        $this->clavePublica = $clavePublica;

        return $this;
    }

    public function getTokenActualizar(): ?string
    {
        return $this->tokenActualizar;
    }

    public function setTokenActualizar(string $tokenActualizar): self
    {
        $this->tokenActualizar = $tokenActualizar;

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

    public function getFechaUltimaActualizacion(): ?\DateTimeInterface
    {
        return $this->fechaUltimaActualizacion;
    }

    public function setFechaUltimaActualizacion(?\DateTimeInterface $fechaUltimaActualizacion): self
    {
        $this->fechaUltimaActualizacion = $fechaUltimaActualizacion;

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

    public function getUsuario(): ?usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?usuario $usuario): self
    {
        $this->usuario = $usuario;

        return $this;
    }
}
