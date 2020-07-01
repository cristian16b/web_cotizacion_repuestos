<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Annotation as Serializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $socialProvider;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $socialId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $socialToken;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Solicitud", mappedBy="solicitante")
     */
    private $solicitudesCotizacion;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cotizacion", mappedBy="oferente")
     */
    private $cotizacionesRealizadas;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fechaBaja;
    
    public function __construct()
    {
        $this->solicitudesCotizacion = new ArrayCollection();
        $this->cotizacionesRealizadas = new ArrayCollection();
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

    public function getSocialProvider(): ?string
    {
        return $this->socialProvider;
    }

    public function setSocialProvider(?string $socialProvider): self
    {
        $this->socialProvider = $socialProvider;

        return $this;
    }

    public function getSocialId(): ?string
    {
        return $this->socialId;
    }

    public function setSocialId(?string $socialId): self
    {
        $this->socialId = $socialId;

        return $this;
    }

    public function getSocialToken(): ?string
    {
        return $this->socialToken;
    }

    public function setSocialToken(?string $socialToken): self
    {
        $this->socialToken = $socialToken;

        return $this;
    }

    /**
     * @return Collection|Solicitud[]
     */
    public function getSolicitudesCotizacion(): Collection
    {
        return $this->solicitudesCotizacion;
    }

    public function addSolicitudesCotizacion(Solicitud $solicitudesCotizacion): self
    {
        if (!$this->solicitudesCotizacion->contains($solicitudesCotizacion)) {
            $this->solicitudesCotizacion[] = $solicitudesCotizacion;
            $solicitudesCotizacion->setSolicitante($this);
        }

        return $this;
    }

    public function removeSolicitudesCotizacion(Solicitud $solicitudesCotizacion): self
    {
        if ($this->solicitudesCotizacion->contains($solicitudesCotizacion)) {
            $this->solicitudesCotizacion->removeElement($solicitudesCotizacion);
            // set the owning side to null (unless already changed)
            if ($solicitudesCotizacion->getSolicitante() === $this) {
                $solicitudesCotizacion->setSolicitante(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Cotizacion[]
     */
    public function getCotizacionesRealizadas(): Collection
    {
        return $this->cotizacionesRealizadas;
    }

    public function addCotizacionesRealizada(Cotizacion $cotizacionesRealizada): self
    {
        if (!$this->cotizacionesRealizadas->contains($cotizacionesRealizada)) {
            $this->cotizacionesRealizadas[] = $cotizacionesRealizada;
            $cotizacionesRealizada->setOferente($this);
        }

        return $this;
    }

    public function removeCotizacionesRealizada(Cotizacion $cotizacionesRealizada): self
    {
        if ($this->cotizacionesRealizadas->contains($cotizacionesRealizada)) {
            $this->cotizacionesRealizadas->removeElement($cotizacionesRealizada);
            // set the owning side to null (unless already changed)
            if ($cotizacionesRealizada->getOferente() === $this) {
                $cotizacionesRealizada->setOferente(null);
            }
        }

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
}
