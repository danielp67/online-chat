<?php

namespace App\DataFixtures;

use App\Entity\Room;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class RoomFixtures extends Fixture implements DependentFixtureInterface
{
    public const ROOM_1 = 'room_1';
    public const ROOM_2 = 'room_2';

    public function load(ObjectManager $manager): void
    {
        $user1 = $this->getReference(UserFixtures::USER_1);
        $user2 = $this->getReference(UserFixtures::USER_2);

        assert($user1 instanceof User);
        assert($user2 instanceof User);

        $room1 = new Room();
         $room1->setName('Room1')
               ->setCreateBy($user1);
        $manager->persist($room1);

        $room2 = new Room();
        $room2->setName('Room2')
            ->setCreateBy($user2);
        $manager->persist($room2);

        $manager->flush();

        $this->addReference(self::ROOM_1, $room1);
        $this->addReference(self::ROOM_2, $room2);
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
