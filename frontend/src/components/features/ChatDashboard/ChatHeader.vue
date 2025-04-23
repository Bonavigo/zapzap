<script setup lang="ts">
defineProps<{
  roomId: string;
}>();
</script>

<template>
  <header
    class="bg-gray-800 p-4 h-16 flex justify-center sm:justify-start items-center border-b-1 border-gray-700"
  >
    <h1 class="text-white font-bold text-2xl">{{ roomId.toLowerCase() }}</h1>
  </header>
</template>
