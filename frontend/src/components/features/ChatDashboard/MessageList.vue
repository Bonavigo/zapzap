<script setup lang="ts">
import { IChatMessage } from "../../../interfaces/chat-message.interface";
import OtherMessage from "./OtherMessage.vue";
import SelfMessage from "./SelfMessage.vue";

defineProps<{
  messages: IChatMessage[];
  username: string;
}>();
</script>

<template>
   <dl class="relative bg-gray-900 flex-1 overflow-auto p-4 flex flex-col items-center gap-4">
    <div class="absolute inset-0 z-0">
      <img
        class="w-full h-full object-fill opacity-50"
        src="../../../assets/Fundo_Chat.png"
        alt="Logo"
      />
    </div>
      <template v-for="(msg, index) in messages" :key="index">
        <SelfMessage
          v-if="msg.sender === username"
          :sender="msg.sender"
          :content="msg.content"
        />
        <OtherMessage v-else :sender="msg.sender" :content="msg.content" />
      </template>
  </dl>
</template>