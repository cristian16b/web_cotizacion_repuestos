<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use DateTime;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PersonaRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(fields={"email"},message="El e-mail ingresado ya se encuentra registrado")
 * @ORM\Table(indexes={
 *   @ORM\Index(name="domicilio_id", columns={"domicilio_id"})
 * })
 */
class Persona
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

      /**
     * @ORM\Column(name="nombre", type="string", length=150)
     * @Assert\NotBlank(message="Debes completar tu nombre")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="El nombre debe tener al menos dos letras",
     *     max = 100,
     *     maxMessage="El nombre no puede tener una longitud mayor a 100 letras"
     * )
     * @Assert\Regex(
     *     pattern="/^[a-zA-Z ]*$/",
     *     message="El nombre solo debe tener letras"
     * )
     */
    protected $nombre;
 
    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message="Debes completar tu e-mail")
     * @Assert\Email(
     *     message="El formato del e-mail no es valido"
     * )
     * @Assert\Unique(message="El e-mail ingresado ya se encuentra registrado")
     */
    protected $email;

        /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Debes completar tu apellido")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="El apellido debe tener al menos dos letras",
     *     max = 100,
     *     maxMessage="El apellido no puede tener una longitud mayor a 100 letras"
     * )
     * @Assert\Regex(
     *     pattern="/^[a-zA-Z ]*$/",
     *     message="El apellido solo debe tener letras"
     * )
     */
    private $apellido;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Debes completar el código de área")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="El código de área debe tener al menos dos números",
     *     max = 10,
     *     maxMessage="El código de área no puede tener una longitud mayor a 10 números"
     * )
     * @Assert\Regex(
     *     pattern="/^[^A-Za-z]*$/",
     *     message="El código de área no puede contener tener letras"
     * ) 
     */
    private $codArea;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Debes completar tu teléfono")
     * @Assert\Length(
     *     min = 6,
     *     minMessage="El teléfono debe tener al menos seis números",
     *     max = 15,
     *     maxMessage="El teléfono no puede tener una longitud mayor a 15 números"
     * )
     * @Assert\Regex(
     *     pattern="/^[^A-Za-z]*$/",
     *     message="El teléfono no puede contener tener letras"
     * ) 
     */
    private $telefono;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $fechaAlta;
 
    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $fechaUltimaModificacion;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $usuarioUltimaModificacion;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Domicilio",  inversedBy="personas" , cascade={"persist", "remove"})
     */
    private $domicilio;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Usuario", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $usuario;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ConstanciaPersona", mappedBy="persona",cascade={"persist", "remove"})
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

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }
 
    /**
     * @param mixed $nombre
     * @return self
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
 
        return $this;
    }

    public function getApellido(): ?string
    {
        return $this->apellido;
    }

    public function setApellido(string $apellido): self
    {
        $this->apellido = $apellido;

        return $this;
    }
 
    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;
 
        return $this;
    }
 
    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
       /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->fechaAlta;
    }
 
    /**
     * @param mixed $fechaAlta
     * @return self
     */
    public function setCreatedAt($fechaAlta)
    {
        $this->fechaAlta = $fechaAlta;
 
        return $this;
    }
 
    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->fechaUltimaModificacion;
    }
 
    /**
     * @param mixed $fechaUltimaModificacion
     * @return self
     */
    public function setUpdatedAt($fechaUltimaModificacion)
    {
        $this->fechaUltimaModificacion = $fechaUltimaModificacion;
 
        return $this;
    }
 
    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updatedTimestamps()
    {
        $dateTimeNow = new DateTime('now');
        $this->setUpdatedAt($dateTimeNow);
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt($dateTimeNow);
        }
    }

    public function getUsuarioUltimaModificacion(): ?string
    {
        return $this->usuarioUltimaModificacion;
    }

    public function setUsuarioUltimaModificacion(string $usuarioUltimaModificacion): self
    {
        $this->usuarioUltimaModificacion = $usuarioUltimaModificacion;

        return $this;
    }

    public function getDomicilio(): ?Domicilio
    {
        return $this->domicilio;
    }

    public function setDomicilio(?Domicilio $domicilio): self
    {
        $this->domicilio = $domicilio;

        return $this;
    }

    public function getUsuario(): ?usuario
    {
        return $this->usuario;
    }

    public function setUsuario(usuario $usuario): self
    {
        $this->usuario = $usuario;

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

    public function getCodArea(): ?string
    {
        return $this->codArea;
    }

    public function setCodArea(string $codArea): self
    {
        $this->codArea = $codArea;

        return $this;
    }

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono): self
    {
        $this->telefono = $telefono;

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
            $constanciaPersona->setPersona($this);
        }

        return $this;
    }

    public function removeConstanciaPersona(ConstanciaPersona $constanciaPersona): self
    {
        if ($this->constanciaPersonas->contains($constanciaPersona)) {
            $this->constanciaPersonas->removeElement($constanciaPersona);
            // set the owning side to null (unless already changed)
            if ($constanciaPersona->getPersona() === $this) {
                $constanciaPersona->setPersona(null);
            }
        }

        return $this;
    }
}
