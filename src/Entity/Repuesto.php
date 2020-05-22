<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RepuestoRepository")
 */
class Repuesto
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
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $mlaId;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoRepuesto", inversedBy="repuestos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tipoRepuesto;

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

    public function getMlaId(): ?string
    {
        return $this->mlaId;
    }

    public function setMlaId(string $mlaId): self
    {
        $this->mlaId = $mlaId;

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
}