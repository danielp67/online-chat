<?php

namespace App\Tests;

use App\Entity\User;
use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertClassHasAttribute;

class UserTest extends TestCase
{
    public function testAssertInstanceOfUser(): void
    {
        $user = new User();
        $this->assertInstanceOf(User::class, $user);

    }



}

