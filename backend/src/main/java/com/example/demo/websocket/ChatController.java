package com.example.demo.websocket;

import com.example.demo.domain.message.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

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
            @Payload ChatMessage message,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Armazena nome de usuário e ID da sala à sua sessão
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        headerAccessor.getSessionAttributes().put("roomId", message.getRoomId());

        // Altera conteúdo da mensagem de entrada de usuário no servidor
        message.setContent("Entrou no chat!");

        return message;
    }
}
