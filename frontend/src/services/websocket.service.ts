import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { reactive, ref } from "vue";
import { ConnectionStateEnum } from "../enums/connection-state.enum";
import { IChatMessage } from "../interfaces/chat-message.interface";

const WS_URL = "http://localhost:8080/ws";

class WebsocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  connectionState = ref<ConnectionStateEnum>(ConnectionStateEnum.DISCONNECTED);
  messages = reactive<Map<string, IChatMessage[]>>(new Map());
  activeRoom = ref<string>("general");
  users = reactive<Set<string>>(new Set());

  connect(username) {
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

    this.client.onConnect = this.onConnect.bind(this);
    // this.client.onStompError = this.onStompError.bind(this);
    // this.client.onWebSocketClose = this.onWebSocketClose.bind(this);

    this.client.activate();
  }

  private onConnect(): void {
    if (!this.client) return;

    this.connectionState.value = ConnectionStateEnum.CONNECTED;
    console.log("Conectado ao servidor WebSocket");

    // Join default room
    this.joinRoom();
  }

  // Subscribe to a chat room
  public joinRoom(): void {
    if (!this.client || !this.client.connected) {
      console.error("Não foi possível conectar a sala");
      return;
    }

    // if (this.subscriptions.has(roomId)) {
    //   console.log(`Already subscribed to room: ${roomId}`);
    //   return;
    // }

    // Subscribe to room messages
    // TODO

    // Se inscrevendo em tópico publico
    this.client.subscribe("/chat/public", this.handleMessage.bind(this));

    // Send join message
    this.sendMessage({
      sender: this.getUsername(),
      content: "Entrou na sala",
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
        // room: roomId,
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
      destination: `/app/chat.sendMessage`,
      body: JSON.stringify(message),
    });
  }

  private handleMessage(message: IMessage): void {
    try {
      console.log("Mensagem recebida:", message.body);
      const chatMessage: IChatMessage = JSON.parse(message.body);

      const TEST_ROOM_ID = "1";

      // Add message to room's message list
      if (!this.messages.has(TEST_ROOM_ID)) {
        this.messages.set(TEST_ROOM_ID, []);
      }

      const roomMessages = this.messages.get(TEST_ROOM_ID);
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

  // Get current username from client
  private getUsername(): string {
    if (!this.client || !this.client.connected) return "";
    return this.client.connectHeaders.username || "";
  }

  disconnect(): void {
    this.client?.deactivate();
  }
}

export const websocketService = new WebsocketService();
