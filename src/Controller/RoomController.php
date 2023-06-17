<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Room;
use App\Form\MessageType;
use App\Form\RoomType;
use App\Repository\MessageRepository;
use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/app')]
class RoomController extends AbstractController
{

    #[Route('/', name: 'app_home', methods: ['GET'])]
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
