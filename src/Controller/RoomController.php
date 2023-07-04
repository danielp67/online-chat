<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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
    public function index(RoomRepository $roomRepository): Response
    {
        return $this->render('base.html.twig', [
        ]);
    }

}
