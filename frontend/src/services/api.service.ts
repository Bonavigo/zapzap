import { reactive } from "vue";

import { IChatRoom } from "../interfaces/chat-room.interface";

const API_URL = "http://localhost:8080";
class ApiService {
  chatRooms = reactive<IChatRoom[]>([]);

  constructor() {
    // Fetch chat rooms on initialization
    this.fetchChatRooms();
  }

  fetchChatRooms() {
    this.chatRooms = [
      { id: "Geral" },
      { id: "Desmatamento" },
      { id: "Mudanças Climáticas" },
      { id: "Poluição" },
    ];
  }
}

export const apiService = new ApiService();
