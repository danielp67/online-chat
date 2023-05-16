<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    #[Route('/api/home', name: 'api_home')]
    public function showRoom(RoomRepository $roomRepository): Response
    {
        $listOfRoom = $roomRepository->findAll();

        dd($listOfRoom);
        return $this->json(["listOfRoom" => $listOfRoom, "user" => $this->getUser()]);
    }
}
