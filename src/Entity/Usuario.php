<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UsuarioRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Usuario implements UserInterface
{
        /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
 
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
     * @Assert\Unique(
     *      message="El e-mail ingresado ya se encuentra registrado"
     * )
     */
    protected $email;
 
    /**
     * @ORM\Column(name="username", type="string", length=255, unique=true)
     */
    protected $username;
 
    protected $salt;
 
    /**
     * @ORM\Column(name="password", type="string", length=255)
     * @Assert\NotBlank(message="Debes completar tu contraseña")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="La contraseña debe tener al menos dos letras",
     *     max = 100,
     *     maxMessage="La contraseña no puede tener una longitud mayor a 100 letras"
     * )
     * @Serializer\Exclude()
     */
    protected $password;
 
    /**
     * @var string
     */
    protected $plainPassword;
 
    /**
     * @var array
     *
     * @ORM\Column(name="roles", type="json_array")
     */
    protected $roles = [];
 
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
     *     min = 2,
     *     minMessage="El teléfono debe tener al menos dos números",
     *     max = 15,
     *     maxMessage="El teléfono no puede tener una longitud mayor a 15 números"
     * )
     * @Assert\Regex(
     *     pattern="/^[^A-Za-z]*$/",
     *     message="El teléfono no puede contener tener letras"
     * ) 
     */
    private $telefono;
    
    public function __construct()
    {
        $this->boards = new ArrayCollection();
    }
 
    /**
     * @return mixed
     */
    public function getId()
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
    public function getUsername()
    {
        return $this->username;
    }
 
    /**
     * @param mixed $username
     * @return self
     */
    public function setUsername($username)
    {
        $this->username = $username;
 
        return $this;
    }
 
    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }
 
    /**
     * @param mixed $password
     * @return self
     */
    public function setPassword($password)
    {
        $this->password = $password;
 
        return $this;
    }
 
    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }
 
    /**
     * @param $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
 
        $this->password = null;
    }
 
    /**
     * Set roles
     *
     * @param array $roles
     *
     * @return User
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
 
        return $this;
    }
 
    /**
     * Get roles
     *
     * @return array
     */
    public function getRoles()
    {
        return ["ROLE_USER"];
    }
 
    public function getSalt() {}
 
    public function eraseCredentials() {}
 
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

    public function getApellido(): ?string
    {
        return $this->apellido;
    }

    public function setApellido(string $apellido): self
    {
        $this->apellido = $apellido;

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
}
