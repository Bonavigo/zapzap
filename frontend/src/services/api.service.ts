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
      { id: "geral" },
      { id: "desmatamento" },
      { id: "mudanças climáticas" },
      { id: "poluição" },
    ];
  }
}

export const apiService = new ApiService();
