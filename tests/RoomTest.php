<?php

namespace App\Tests;

use App\Entity\Room;
use PHPUnit\Framework\TestCase;

class RoomTest extends TestCase
{
    public function testAssertInstanceOfRoom(): void
    {
        $room = new Room();
        $this->assertInstanceOf(Room::class, $room);

    }
}
