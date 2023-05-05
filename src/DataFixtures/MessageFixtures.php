<?php

namespace App\DataFixtures;

use App\Entity\Message;
use App\Entity\Room;
use App\Entity\User;
use DateInterval;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MessageFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager): void
    {

        $user1 = $this->getReference(UserFixtures::USER_1);
        $user2 = $this->getReference(UserFixtures::USER_2);
        $room1 = $this->getReference(RoomFixtures::ROOM_1);
        $room2 = $this->getReference(RoomFixtures::ROOM_2);

        assert($user1 instanceof User);
        assert($user2 instanceof User);
        assert($room1 instanceof Room);
        assert($room2 instanceof Room);

         $message1 = new Message();
        $message1->setCreatedAt((new DateTime())->sub(new DateInterval('P2D')))
            ->setContent('Message 1')
            ->setUser($user1)
            ->setRoom($room1);
        $manager->persist($message1);


        $message2 = new Message();
        $message2->setCreatedAt(new DateTime())
            ->setContent('Message 2')
            ->setUser($user2)
            ->setRoom($room1);
        $manager->persist($message2);

        $message3 = new Message();
        $message3->setCreatedAt((new DateTime())->sub(new DateInterval('P2D')))
            ->setContent('Message 3')
            ->setUser($user1)
            ->setRoom($room2);
        $manager->persist($message3);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            RoomFixtures::class
        ];
    }
}
