import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { reactive, ref } from "vue";
import { ConnectionStateEnum } from "../enums/connection-state.enum";
import { IChatMessageResponse } from "../interfaces/chat-message-response.interface";
import { IChatMessage } from "../interfaces/chat-message.interface";

const WS_URL = "http://localhost:8080/ws";

class WebsocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  connectionState = ref<ConnectionStateEnum>(ConnectionStateEnum.DISCONNECTED);
  messages = reactive<Map<string, IChatMessage[]>>(new Map());
  activeRoom = ref<string>("general");
  users = reactive<string[]>([]);

  connect(username: string, roomId: string) {
    if (this.client && this.client.connected) {
      return;
    }

    this.connectionState.value = ConnectionStateEnum.CONNECTING;

    this.client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        username,
      },
      reconnectDelay: 1000,
    });

    this.client.onConnect = this.onConnect.bind(this, roomId);
    // this.client.onStompError = this.onStompError.bind(this);
    // this.client.onWebSocketClose = this.onWebSocketClose.bind(this);

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
      console.log(`Já inscrito nesta sala: ${roomId}`);
      return;
    }

    // Subscribe to chat room
    const subscription = this.client.subscribe(
      `/chat/${roomId}`,
      this.handleMessage.bind(this)
    );
    this.subscriptions.set(roomId, subscription);
    this.activeRoom.value = roomId;

    // Initialize messages array for this room if needed
    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }

    // Send join message
    this.sendMessage({
      sender: this.getUsername(),
      content: "Entrou na sala",
      roomId: roomId,
      type: "JOIN",
    });

    // Get users in room
    // TODO
  }

  // Leave a chat room
  public leaveRoom(roomId: string): void {
    const subscription = this.subscriptions.get(roomId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(roomId);

      // Send leave message
      this.sendMessage({
        sender: this.getUsername(),
        content: "Saiu da sala",
        roomId: roomId,
        type: "LEAVE",
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
      destination: `/app/chat/${message.roomId}/sendMessage`,
      body: JSON.stringify(message),
    });
  }

  private handleMessage(message: IChatMessageResponse): void {
    try {
      console.log("Mensagem recebida:", message.body);
      const chatMessage: IChatMessage = JSON.parse(message.body);

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
        this.users.push(chatMessage.sender);
      } else if (chatMessage.type === "LEAVE") {
        this.users = this.users.filter((user) => user !== chatMessage.sender);
      }
    } catch (error) {
      console.error("Erro ao tratar a mensagem:", error);
    }
  }

  // Get current username from client
  private getUsername(): string {
    if (!this.client || !this.client.connected) return "";
    return this.client.connectHeaders.username || "";
  }

  // TODO CHECK IF THIS IS CORRECT
  disconnect(): void {
    this.client?.deactivate();
  }
}

export const websocketService = new WebsocketService();
