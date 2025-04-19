<script setup lang="ts">
import ChatLayout from "@/components/layouts/ChatLayout.vue";
import ChatSidebarLayout from "@/components/layouts/ChatSidebarLayout.vue";
</script>

<template>
  <div class="w-screen h-screen flex">
    <ChatSidebarLayout />
    <ChatLayout />
  </div>
</template>

<style scoped></style>
