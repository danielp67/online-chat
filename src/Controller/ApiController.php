<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class ApiController extends AbstractController
{
    #[Route('/api/home', name: 'api_home')]
    public function apiHome(RoomRepository $roomRepository): Response
    {
        $rooms = $roomRepository->findAll();

        return $this->json([
            "rooms" => $rooms,
            "user" => $this->getUser()
        ],200, [''], [AbstractNormalizer::GROUPS => ['getCollection:room', 'get:user']]);
    }

}
