<script setup lang="ts">
import ChatHeader from "../features/ChatDashboard/ChatHeader.vue";
import MessageInput from "../features/ChatDashboard/MessageInput.vue";
import MessageList from "../features/ChatDashboard/MessageList.vue";

import { websocketService } from "@/services/websocket.service";

import { ConnectionStateEnum } from "@/enums/connection-state.enum";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const username = ref(localStorage.getItem("username") || "Guest");

// Computed property to get messages for current room
const currentMessages = computed(() => {
  return websocketService.messages?.get("1") || [];
});

onMounted(() => {
  if (
    websocketService.connectionState?.value !== ConnectionStateEnum.CONNECTED
  ) {
    websocketService.connect(username.value);
  }
});

const sendMessage = (message) => {
  websocketService.sendMessage({
    sender: username.value,
    content: message,
    // room: websocketService.activeRoom.value,
    type: "CHAT",
  });
};

// Watch connection state for reconnection
watch(websocketService.connectionState, (newState, oldState) => {
  if (
    newState === ConnectionStateEnum.DISCONNECTED &&
    oldState === ConnectionStateEnum.CONNECTED
  ) {
    // Attempt to reconnect if unexpectedly disconnected
    setTimeout(() => {
      websocketService.connect(username.value);
    }, 2000);
  }
});

onBeforeUnmount(() => {
  websocketService.disconnect();
});
</script>

<template>
  <section class="w-full h-screen flex flex-col">
    <ChatHeader />
    <MessageList :messages="currentMessages" :username="'Guest'" />
    <MessageInput @send="sendMessage" />
  </section>
</template>
