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
            'rooms' => $roomRepository->findAll(),
            'user' => $this->getUser()
        ]);
    }

    #[Route('/home', name: 'app_room_home', methods: ['GET'])]
    public function index(RoomRepository $roomRepository): Response
    {
        return $this->render('room/home.html.twig', [
            'rooms' => $roomRepository->findAll(),
            'user' => $this->getUser()
        ]);
    }

    #[Route('/new', name: 'app_room_new', methods: ['GET', 'POST'])]
    public function new(Request $request, RoomRepository $roomRepository, HubInterface $hub): Response
    {
        $room = new Room();
        $form = $this->createForm(RoomType::class, $room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $room->setCreateBy($this->getUser());

            $roomRepository->save($room, true);
          //  dd($room);

            return $this->redirectToRoute('app_room_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('room/new.html.twig', [
            'room' => $room,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_room_show', methods: ['GET', 'POST'])]
    public function show(Request $request, Room $room, MessageRepository $messageRepository,
    HubInterface $hub
    ): Response
    {
        $message = new Message();
        $form = $this->createForm(MessageType::class, $message);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $message->setCreatedAt(new \DateTime());
            $message->setRoom($room);
            $message->setUser($this->getUser());

            $messageRepository->save($message, true);
            $dateContext = array(DateTimeNormalizer::FORMAT_KEY => 'd/m/Y');
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer(), new ArrayDenormalizer(), new DateTimeNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $data = $serializer->normalize($message, null, [
                AbstractNormalizer::GROUPS => ['read:message'],
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['user','room', 'rooms', 'createdAt']

                ]
            );

            $data = json_encode(
            [ 'username' => $message->getUser()->getUsername(),
               'createdAt' => $message->getCreatedAt()->format('Y-m-d H:i:s'),
                'content' => $message->getContent()
            ]
            );

            $update = new Update(
                'https://example.com/app/room/' . $room->getId(),
                $data
            );

            $hub->publish($update);
            return $this->redirectToRoute('app_room_show', ['id' => $room->getId()]);

        }

        return $this->render('room/show.html.twig', [
            'room' => $room,
            'user' => $this->getUser(),
            'messages' => $messageRepository->findby(['room' => $room],['createdAt' => 'ASC']),
            'form' => $form,

        ]);
    }

    #[Route('/{id}/edit', name: 'app_room_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Room $room, RoomRepository $roomRepository): Response
    {
        $form = $this->createForm(RoomType::class, $room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $roomRepository->save($room, true);

            return $this->redirectToRoute('app_room_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('room/edit.html.twig', [
            'room' => $room,
            'form' => $form,
        ]);
    }

    #[Route('/{id}/delete', name: 'app_room_delete', methods: ['GET','POST'])]
    public function delete(Request $request, Room $room, RoomRepository $roomRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$room->getId(), $request->request->get('_token'))) {
            $roomRepository->remove($room, true);
        }

        return $this->redirectToRoute('app_room_index', [], Response::HTTP_SEE_OTHER);
    }

}
