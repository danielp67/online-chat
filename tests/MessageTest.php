<?php

namespace App\Tests;

use App\Entity\Message;
use PHPUnit\Framework\TestCase;

class MessageTest extends TestCase
{
    public function testAssertInstanceOfMessage(): void
    {
        $message = new Message();
        $this->assertInstanceOf(Message::class, $message);

    }
}
