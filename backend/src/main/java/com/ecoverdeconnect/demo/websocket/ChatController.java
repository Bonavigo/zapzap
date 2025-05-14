package com.ecoverdeconnect.demo.websocket;

import com.ecoverdeconnect.demo.domain.message.ChatMessage;
import com.ecoverdeconnect.demo.domain.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Acompanha usuários conectados em cada uma das salas
    private final Map<String, Set<String>> roomUsers = new ConcurrentHashMap<>();

    @MessageMapping("/chat/{roomId}/getUsers")
    public void getRoomUsers(
            @DestinationVariable String roomId,
            @Payload ChatMessage receivedMessage
    ) {
        // Retorna lista de users conectados na sala
        Set<String> users = roomUsers.getOrDefault(roomId, Collections.emptySet());

        System.out.println("users: " + users);

        // Cria mensagem com a list de usuários
        ChatMessage message = new ChatMessage();
        message.setType(MessageType.USER_LIST);
        message.setContent(users);  // Passing List<String>
        message.setSender("SERVER");
        message.setRoomId(roomId);

        // Retorna a mensagem somente para o usuário que à solicitou
        messagingTemplate.convertAndSendToUser(
                receivedMessage.getSender(),
                "/queue/chat/" + roomId,
                message
        );
    }

    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/chat/{roomId}")
    public ChatMessage sendMessage(
            @Payload ChatMessage message
    ) {
        return message;
    }


    @MessageMapping("/chat/{roomId}/addUser")
    @SendTo("/chat/{roomId}")
    public ChatMessage addUser(
            @DestinationVariable String roomId,
            @Payload ChatMessage message,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Armazena nome de usuário e ID da sala à sua sessão
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        headerAccessor.getSessionAttributes().put("roomId", message.getRoomId());

        // Altera conteúdo da mensagem de entrada de usuário no servidor
        message.setContent("Entrou no sala!");

        message.setType(MessageType.JOIN);

        // Adiciona usuário a lista de usuários conectados na sala
        roomUsers.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet())
                .add(message.getSender());

        return message;
    }

    @MessageMapping("/chat/{roomId}/removeUser")
    @SendTo("/chat/{roomId}")
    public ChatMessage removeUser(
            @DestinationVariable String roomId,
            @Payload ChatMessage message
    ) {
        Set<String> users = roomUsers.get(roomId);

        // Verifica se a sala existe para uma remoção de usuário segura
        if (users != null) {
            users.remove(message.getSender());
            if (users.isEmpty()) {
                roomUsers.remove(roomId);
            }
        }

        return message;
    }
}
