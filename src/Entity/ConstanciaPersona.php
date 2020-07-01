<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ConstanciaPersonaRepository")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="tipo_id", columns={"tipo_id"}),
 *   @ORM\Index(name="persona_id", columns={"persona_id"})
 * })
 */
class ConstanciaPersona
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
     * @ORM\Column(type="string", length=255)
     */
    private $nombreLogico;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombreFisico;

    /**
     * @ORM\Column(type="float")
     * @Assert\Range(
     *      min = 0,
     *      max = 2,
     *      minMessage = "Debe cargar un archivo",
     *      maxMessage = "No puede subir archivos de más de 2 MegaBytes"
     * ) 
     */
    private $pesgoMega;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    private $file;

    private $extensionArchivo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoConstancia", inversedBy="constanciaPersonas")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tipo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Persona", inversedBy="constanciaPersonas")
     * @ORM\JoinColumn(nullable=false)
     */
    private $persona;



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

    public function getNombreLogico(): ?string
    {
        return $this->nombreLogico;
    }

    public function setNombreLogico(string $nombreLogico): self
    {
        $this->nombreLogico = $nombreLogico;

        return $this;
    }

    public function getNombreFisico(): ?string
    {
        return $this->nombreFisico;
    }

    public function setNombreFisico(string $nombreFisico): self
    {
        $this->nombreFisico = $nombreFisico;

        return $this;
    }

    public function getPesgoMega(): ?float
    {
        return $this->pesgoMega;
    }

    public function setPesgoMega(float $pesgoMega): self
    {
        $this->pesgoMega = $pesgoMega;

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

    public function getFile()
    {
        return $this->file;
    }

    public function setFile($file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getExtensionArchivo(): ?string
    {
        return $this->extensionArchivo;
    }

    public function setExtensionArchivo(string $extensionArchivo): self
    {
        $this->extensionArchivo = $extensionArchivo;

        return $this;
    }

    public function getTipo(): ?TipoConstancia
    {
        return $this->tipo;
    }

    public function setTipo(?TipoConstancia $tipo): self
    {
        $this->tipo = $tipo;

        return $this;
    }

    public function getPersona(): ?Persona
    {
        return $this->persona;
    }

    public function setPersona(?Persona $persona): self
    {
        $this->persona = $persona;

        return $this;
    }
}
