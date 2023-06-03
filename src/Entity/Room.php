<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
#[ApiResource(operations: [
    new Get(),
    new Put(denormalizationContext: ['groups' => ['put:room']]),
    new Delete(),
    new GetCollection(normalizationContext: ['groups' => ['getCollection:room']]),
    new Post(denormalizationContext: ['groups' => ['post:room']])
],

    normalizationContext: ['groups' => ['get:room']],

)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getCollection:room', 'get:room'])]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'room', targetEntity: Message::class, cascade: ['persist', 'remove'])]
    #[Groups(['get:room'])]
    private Collection $message;

    #[ORM\Column(length: 255)]
    #[Groups(['getCollection:room', 'get:room', 'post:room', 'put:room'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'room', targetEntity: User::class)]
    #[Groups(['get:room'])]
    private Collection $users;

    #[ORM\ManyToOne(inversedBy: 'rooms')]
    #[Groups(['get:room', 'post:room'])]
    private ?User $createBy = null;

    public function __construct()
    {
        $this->message = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessage(): Collection
    {
        return $this->message;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->message->contains($message)) {
            $this->message->add($message);
            $message->setRoom($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->message->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getRoom() === $this) {
                $message->setRoom(null);
            }
        }

        return $this;
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

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setRoom($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getRoom() === $this) {
                $user->setRoom(null);
            }
        }

        return $this;
    }

    public function getCreateBy(): ?User
    {
        return $this->createBy;
    }

    public function setCreateBy(?User $createBy): self
    {
        $this->createBy = $createBy;

        return $this;
    }

}
