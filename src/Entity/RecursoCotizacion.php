<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecursoCotizacionRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="cotizacion_id", columns={"cotizacion_id"})
 * })
 */
class RecursoCotizacion
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
    private $nombreLogico;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    private $nombreFisico;

    /**
     * @ORM\Column(type="date")
     */
    private $fechaAlta;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\Column(type="float")
     */
    private $pesoMega;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\cotizacion", inversedBy="recursoCotizacions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $cotizacion;

    /**
     * atributos no mapeables, usados para calculos u operaciones auxiliares
     */
    private $base64;

    private $extensionArchivo;

    private $directorio;

    // 

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPesoMega(): ?float
    {
        return $this->pesoMega;
    }

    public function setPesoMega(float $pesoMega): self
    {
        $this->pesoMega = $pesoMega;

        return $this;
    }

    public function getCotizacion(): ?cotizacion
    {
        return $this->cotizacion;
    }

    public function setCotizacion(?cotizacion $cotizacion): self
    {
        $this->cotizacion = $cotizacion;

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

    /*
    * funciones auxiliares
    */

    public function getBase64() { return $this->base64; }

    public function setBase64($base) { 
        $this->base64 = $base;
        $this->obtenerTamanioImagen();
        $this->obtenerExtensionImagen();
        $this->obtenerNombreFisico();
    }

    public function obtenerTamanioImagen() {
        // https://stackoverflow.com/questions/53228948/how-to-get-image-file-size-from-base-64-string-in-javascript
        // x = (n * (3/4)) - y
        // no se substrae el elemento y porque solo varia en uno o dos bits y obtenerlo es un costo innecesario
        // formulada aplicada x = (n * (3/4)) bytes
        $this->pesoMega = (strlen($this->base64) * (3/4))/1048576;
    }

    public function obtenerExtensionImagen() {
        // https://stackoverflow.com/questions/18658437/get-image-type-from-base64-encoded-src-string
        $match = '';
        preg_match("/^data:image\/(.*);base64/i",$this->base64, $match);
        $this->extensionArchivo = $match[1];
    }

    // ejemplo userId_1200_bateria_12/10/20 12:20.png
    public function obtenerNombreLogico($index,$nombreRepuesto) {
        $this->nombreLogico = $nombreRepuesto . '_'. $index . '_' . date('d/m/Y')  . '.' . $this->extensionArchivo;
    }

    public function obtenerNombreFisico() {
        $this->nombreFisico =  md5(uniqid()).'.'. $this->extensionArchivo;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function guardarArchivo() {
        file_put_contents($this->directorio .'/fotosCotizaciones'.'/'.$this->nombreFisico, file_get_contents($this->base64));
    }

    public function setDirectorio($directorio) {
        $this->directorio = $directorio;
    }
}
