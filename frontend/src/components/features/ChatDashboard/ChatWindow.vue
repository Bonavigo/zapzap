<script setup lang="ts">
import SelfMessage from "./SelfMessage.vue";
import OtherMessage from "./OtherMessage.vue";
</script>

<template>
  <div class="bg-gray-900 flex-1 flex flex-col">
    <div class="flex-1 flex flex-col p-4">
      <img
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-120 opacity-50"
        src="@/assets/EcoVerde_Preto.png"
        alt="Logo"
      />
      <dl class="flex flex-col gap-4">
        <SelfMessage />
        <SelfMessage />
        <OtherMessage />
      </dl>
    </div>
    <form class="bg-gray-800 p-4 flex gap-2">
      <input
        class="flex-1 bg-gray-900 p-2 text-gray-300 outline-green-800"
        type="text"
        name="message"
        id="message"
        placeholder="Digite sua mensagem..."
      />
      <button
        class="bg-green-700 rounded-lg px-3 hover:cursor-pointer hover:bg-green-600 active:bg-green-800"
      >
        <Icon icon="mdi:send" class="text-white" />
      </button>
    </form>
  </div>
</template>
