<?php

namespace App\Controller;

use App\Entity\Message;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/app/room/{roomId}')]
class MessageController extends AbstractController
{

    #[Route('/{id}/edit', name: 'app_message_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Message $message, MessageRepository $messageRepository): Response
    {
        $form = $this->createForm(MessageType::class, $message);
        $form->handleRequest($request);
        $roomId = $request->attributes->get('roomId');
      //  dd($request->attributes->get('roomId'));
        if ($form->isSubmitted() && $form->isValid()) {
            $messageRepository->save($message, true);

            return $this->redirectToRoute('app_room_show', ['id' => $roomId], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('message/edit.html.twig', [
            'message' => $message,
            'form' => $form,
            'roomId' => $roomId
        ]);
    }

    #[Route('/{id}/delete', name: 'app_message_delete', methods: ['GET','POST'])]
    public function delete(Request $request, Message $message, MessageRepository $messageRepository): Response
    {
        $roomId = $request->attributes->get('roomId');

        if ($this->isCsrfTokenValid('delete'.$message->getId(), $request->request->get('_token'))) {

            $messageRepository->remove($message, true);
        }

        return $this->redirectToRoute('app_room_show', ['id' => $roomId], Response::HTTP_SEE_OTHER);
    }
}
