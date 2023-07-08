<?php

namespace App\Controller;

use App\Entity\Room;
use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/app')]
class RoomController extends AbstractController
{

    #[Route('/home', name: 'app_home', methods: ['GET'])]
    public function home(RoomRepository $roomRepository): Response
    {
        return $this->render('base.html.twig', [
        ]);
    }

    #[Route('/rooms', name: 'app_room', methods: ['GET'])]
    public function room(RoomRepository $roomRepository): Response
    {
        return $this->render('base.html.twig', [
        ]);
    }

    #[Route('/rooms/{id}', name: 'app_index', methods: ['GET'])]
    public function index(RoomRepository $roomRepository, HubInterface $hub): Response
    {
        //$this->publish($hub);
        $update = new Update(
            'https://example.com/app/rooms/1',
            json_encode(['status' => 'OutOfStock'])
        );

        $hub->publish($update);

        return $this->render('base.html.twig', [
        ]);
    }

    #[Route('/rooms/{id}/publish', name: 'app_room_publish', methods: ['GET', 'POST'])]
    public function publish(Request $request, Room $room, HubInterface $hub): Response
    {
        //dd($hub);
        $update = new Update(
            'https://example.com/app/rooms/' . $room->getId(),
            json_encode(['status' => 'OutOfStock'])
        );

        $hub->publish($update);

        return $this->render('base.html.twig', [ 'rooms' => $room
        ]);
    }


}
