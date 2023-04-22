<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public const USER_1 = 'user_1';
    public const USER_2 = 'user_2';

    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {


        $user1 = new User();
        $user1->setUsername('Pseudo1')
            ->setEmail('john.doe@test.com')
            ->setPassword($this->passwordHasher->hashPassword(
                $user1,
                'p'
            ))
            ->setRoles(['ROLE_USER'])
        ;

        $manager->persist($user1);

        $user2 = new User();
        $user2->setUsername('Pseudo2')
            ->setEmail('jane.doe@test.com')
            ->setPassword($this->passwordHasher->hashPassword(
                $user2,
                'p'
            ))
            ->setRoles(['ROLE_USER'])
        ;

        $manager->persist($user1);

        $manager->flush();


        $this->addReference(self::USER_1, $user1);
        $this->addReference(self::USER_2, $user2);
    }

}
