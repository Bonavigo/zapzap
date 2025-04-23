<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import ChatLayout from "../components/layouts/ChatLayout.vue";
import ChatSidebarLayout from "../components/layouts/ChatSidebarLayout.vue";

import { ConnectionStateEnum } from "../enums/connection-state.enum";
import { apiService } from "../services/api.service";
import { authService } from "../services/auth.service";
import { websocketService } from "../services/websocket.service";

const username = computed(() => {
  return authService.getUser() || "Anônimo";
});

const currentUsers = computed(() => {
  return Array.from(websocketService.users) || new Set();
});

const currentChatRooms = computed(() => {
  return Array.from(apiService.chatRooms) || new Set();
});

const currentMessages = computed(() => {
  return websocketService.messages.get(websocketService.activeRoom.value) || [];
});

const sendMessage = (messageContent) => {
  websocketService.sendMessage({
    sender: username.value,
    content: messageContent,
    roomId: websocketService.activeRoom.value,
    type: "CHAT",
  });
};

onMounted(() => {
  if (
    websocketService.connectionState?.value !== ConnectionStateEnum.CONNECTED
  ) {
    // TODO: Dinamyc set the chat room from parent component
    websocketService.connect(username.value, "Geral");
  }
});

// Watch connection state for reconnection
watch(websocketService.connectionState, (newState, oldState) => {
  if (
    newState === ConnectionStateEnum.DISCONNECTED &&
    oldState === ConnectionStateEnum.CONNECTED
  ) {
    // Attempt to reconnect if unexpectedly disconnected
    setTimeout(() => {
      websocketService.connect(username.value, "Geral");
    }, 2000);
  }
});

onBeforeUnmount(() => {
  websocketService.disconnect();
});
</script>

<template>
  <div class="w-screen h-screen flex">
    <ChatSidebarLayout :users="currentUsers" :chatRooms="currentChatRooms" />
    <ChatLayout
      @send="sendMessage"
      :username="username"
      :messages="currentMessages"
    />
  </div>
</template>

<style scoped></style>
