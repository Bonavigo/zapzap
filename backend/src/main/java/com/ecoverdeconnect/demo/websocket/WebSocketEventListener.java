package com.ecoverdeconnect.demo.websocket;

import com.ecoverdeconnect.demo.domain.message.MessageType;
import com.ecoverdeconnect.demo.domain.message.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageTemplate;

    @Autowired
    public WebSocketEventListener(SimpMessageSendingOperations messageTemplate) {
        this.messageTemplate = messageTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(
            SessionDisconnectEvent event
    ) {
        // Recupera nome de usuário salvo no headerAccessor
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        if(username != null) {
            ChatMessage message = new ChatMessage(MessageType.LEAVE, "Saiu do chat!",  username);

            messageTemplate.convertAndSend("/chat/"+ roomId, message);
        }
    }
}
