<script setup lang="ts">
import { IChatMessage } from "../../interfaces/chat-message.interface";
import ChatHeader from "../features/ChatDashboard/ChatHeader.vue";
import MessageInput from "../features/ChatDashboard/MessageInput.vue";
import MessageList from "../features/ChatDashboard/MessageList.vue";

const props = defineProps<{
  roomId: string;
  username: string;
  messages: IChatMessage[];
}>();

const emit = defineEmits<{
  (e: "send", messageContent: string): void;
}>();

const sendMessage = (messageContent: string) => {
  emit("send", messageContent);
};
</script>

<template>
  <section class="w-full h-screen flex flex-col">
    <ChatHeader :roomId="props.roomId" />
    <MessageList :messages="props.messages" :username="props.username" />
    <MessageInput @send="sendMessage" />
  </section>
</template>
