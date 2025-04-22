<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["send"]);

const messageInput = ref("");

const sendMessage = () => {
  if (!messageInput.value.trim()) return;

  emit("send", messageInput.value);

  messageInput.value = "";
};
</script>

<template>
  <form @submit.prevent="sendMessage" class="bg-gray-800 p-4 flex gap-2">
    <input
      v-model="messageInput"
      class="flex-1 bg-gray-900 p-2 text-gray-300 outline-green-800"
      type="text"
      name="message"
      id="message"
      placeholder="Digite sua mensagem..."
    />
    <button
      class="bg-green-700 rounded-lg px-3 hover:cursor-pointer hover:bg-green-600 active:bg-green-800"
    >
      <Icon
        class="text-gray-100"
        icon="mdi:send-variant"
        width="24"
        height="24"
      />
    </button>
  </form>
</template>
