import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { reactive, ref } from "vue";
import { ConnectionStateEnum } from "../enums/connection-state.enum";
import { IChatMessageResponse } from "../interfaces/chat-message-response.interface";
import { IChatMessage } from "../interfaces/chat-message.interface";
import router from "../router";
import { apiClientService } from "./api-client.service";
import { authService } from "./auth.service";

class WebsocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  connectionState = ref<ConnectionStateEnum>(ConnectionStateEnum.DISCONNECTED);
  messages = reactive<Map<string, IChatMessage[]>>(new Map());
  activeRoom = ref<string>("geral");
  users = reactive<Set<string>>(new Set());

  get wsUrl(): string {
    const baseUrl = apiClientService.getBaseURL();
    return `${baseUrl}/ws`;
  }

  get username(): string | null {
    return authService.getUser()?.username || null;
  }

  connect(roomId: string) {
    if (this.client && this.client.connected) {
      return;
    }

    this.connectionState.value = ConnectionStateEnum.CONNECTING;

    const clientUsername = this.username;

    if (!clientUsername) {
      router.push("/");
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(this.wsUrl),
      connectHeaders: {
        username: clientUsername,
      },
      reconnectDelay: 1000,
    });

    this.client.onConnect = this.onConnect.bind(this, roomId);

    this.client.activate();
  }

  private onConnect(roomId: string): void {
    if (!this.client) return;

    this.connectionState.value = ConnectionStateEnum.CONNECTED;
    console.log("Conectado ao servidor WebSocket");

    // Join default room
    this.joinRoom(roomId);
  }

  // Subscribe to a chat room
  public joinRoom(roomId: string): void {
    if (!this.client || !this.client.connected) {
      console.error("Não foi possível conectar a sala");
      return;
    }

    if (this.subscriptions.has(roomId)) {
      console.log(`Já inscrito nesta sala: ${roomId.toLowerCase()}`);
      return;
    }

    // 1. Subscribe to chat-room
    const subscription = this.client.subscribe(
      `/chat/${roomId.toLowerCase()}`,
      this.handleMessage.bind(this)
    );
    this.subscriptions.set(roomId, subscription);
    this.activeRoom.value = roomId;

    // 2. Subscribe to user-specific messages
    const userSubscription = this.client.subscribe(
      `/user/${this.username}/queue/chat/${roomId.toLowerCase()}`,
      (message) => {
        console.log("PRIVATE MESSAGE RECEIVED:", message);
        this.handleMessage(message);
      }
    );
    this.subscriptions.set(`${roomId}_user`, userSubscription);

    // Initialize messages array for this room if needed
    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }

    // Send join message
    this.client.publish({
      destination: `/app/chat/${roomId.toLowerCase()}/addUser`,
      body: JSON.stringify({
        type: "JOIN",
        content: "Entrou na sala",
        sender: this.username!,
        roomId: roomId,
      }),
    });

    // Get users in room
    this.client.publish({
      destination: `/app/chat/${roomId.toLowerCase()}/getUsers`,
      body: JSON.stringify({
        sender: this.username!,
        roomId: roomId,
      }),
    });
  }

  // Leave a chat room
  public leaveRoom(roomId: string): void {
    const subscription = this.subscriptions.get(roomId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(roomId);

      // Send leave message
      this.client!.publish({
        destination: `/app/chat/${roomId.toLowerCase()}/removeUser`,
        body: JSON.stringify({
          type: "LEAVE",
          content: "Saiu da sala",
          sender: this.username!,
          roomId: roomId,
        }),
      });
    }
  }

  // Send message to server
  public sendMessage(message: IChatMessage): void {
    if (!this.client || !this.client.connected) {
      console.error("Não foi possível enviar a mensagem");
      return;
    }

    this.client.publish({
      destination: `/app/chat/${message.roomId.toLowerCase()}/sendMessage`,
      body: JSON.stringify(message),
    });
  }

  private handleMessage(message: IChatMessageResponse): void {
    try {
      console.log("Mensagem recebida:", message.body);
      const chatMessage: IChatMessage = JSON.parse(message.body);

      // Check if is user list message and set to the correct handler
      if (chatMessage.type === "USER_LIST") {
        return this.handleUserList(chatMessage.content as string[]);
      }

      // Add message to room's message list
      if (!this.messages.has(chatMessage.roomId)) {
        this.messages.set(chatMessage.roomId, []);
      }

      const roomMessages = this.messages.get(chatMessage.roomId);
      if (roomMessages) {
        roomMessages.push(chatMessage);
      }

      // Handle user join/leave events
      if (chatMessage.type === "JOIN") {
        this.users.add(chatMessage.sender);
      } else if (chatMessage.type === "LEAVE") {
        this.users.delete(chatMessage.sender);
      }
    } catch (error) {
      console.error("Erro ao tratar a mensagem:", error);
    }
  }

  private handleUserList(userList: string[]): void {
    try {
      console.log("Lista de usuários recebida:", userList);
      this.users.clear();
      if (userList.length === 0) {
        this.users.add(this.username!);
        return;
      }
      userList.forEach((username) => this.users.add(username));
    } catch (error) {
      console.error("Erro ao tratar a lista de usuários:", error);
    }
  }

  disconnect(): void {
    try {
      // Unsubscribe from all rooms first
      this.subscriptions.forEach((subscription, roomId) => {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.warn(
            `Falha ao tentar se desinscrever da sala de bate-papo: ${roomId}:`,
            error
          );
        }
      });

      // Clear subscriptions map
      this.subscriptions.clear();

      // Deactivate client
      if (this.client) {
        this.client.deactivate();
        this.client = null; // Remove reference to client
      }

      // Reset state
      this.connectionState.value = ConnectionStateEnum.DISCONNECTED;
      this.users.clear();

      console.log("Desconectado do servidor WebSocket");
    } catch (error) {
      console.error("Erro durante a desconexão:", error);
      // Force connection state to disconnected even if there was an error
      this.connectionState.value = ConnectionStateEnum.DISCONNECTED;
    }
  }
}

export const websocketService = new WebsocketService();
