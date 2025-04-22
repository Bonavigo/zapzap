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
  <dl
    class="relative bg-gray-900 flex-1 overflow-auto p-4 flex flex-col items-center gap-4"
  >
    <img
      class="opacity-50 pointer-events-none max-w-100 sticky top-1/2 -translate-y-1/2"
      src="../../../assets/EcoVerde_Preto.png"
      alt="Logo"
    />
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
