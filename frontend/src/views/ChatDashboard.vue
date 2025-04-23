<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import ChatLayout from "../components/layouts/ChatLayout.vue";
import ChatSidebarLayout from "../components/layouts/ChatSidebarLayout.vue";

import { useRoute } from "vue-router";
import { ConnectionStateEnum } from "../enums/connection-state.enum";
import { apiService } from "../services/api.service";
import { authService } from "../services/auth.service";
import { websocketService } from "../services/websocket.service";

const route = useRoute();

// Get the roomId from route params or use default
const roomId = computed(() => {
  return (route.params.roomId as string) || "Geral";
});

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
    // Dinamyc set the chat room from url
    const isValidRoomId = apiService.chatRooms.some(
      (room) => room.id.toLowerCase() === roomId.value.toLowerCase()
    );
    if (isValidRoomId) {
      websocketService.connect(username.value, roomId.value.toLowerCase());
      return;
    }
    window.alert(
      "Sala de bate-papo inválida! Por favor, escolha uma sala válida."
    );
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
      websocketService.connect(username.value, roomId.value.toLowerCase());
    }, 2000);
  }
});

watch(roomId, (newRoomId) => {
  if (websocketService.activeRoom.value !== newRoomId) {
    websocketService.leaveRoom(websocketService.activeRoom.value);
    websocketService.joinRoom(newRoomId);
    websocketService.activeRoom.value = newRoomId;
    websocketService.messages.set(newRoomId, []);
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
      :roomId="roomId"
      :username="username"
      :messages="currentMessages"
    />
  </div>
</template>

<style scoped></style>
