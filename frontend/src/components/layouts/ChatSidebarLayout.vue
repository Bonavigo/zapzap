<script setup lang="ts">
import GroupCard from "@/components/features/ChatDashboard/GroupCard.vue";
import UserCard from "@/components/features/ChatDashboard/UserCard.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";

import { websocketService } from "../../services/websocket.service";

const isOpen = ref(open);

const toggleSidebar = () => {
  if (window.innerWidth > 640 && isOpen.value) {
    return;
  }
  isOpen.value = !isOpen.value;
};

const handleResize = () => {
  const isMobile = window.innerWidth < 640;

  if (!isMobile.value) {
    isOpen.value = true;
  }
};

// Computed property to get messages for current room
const currentUsers = computed(() => {
  return websocketService.users || [];
});

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <aside
    :class="{ '-left-full': !isOpen, 'left-0': isOpen }"
    class="z-3 flex flex-col transition-all duration-150 fixed h-full sm:static min-w-60 bg-gray-800"
  >
    <button
      @click="toggleSidebar"
      class="fixed top-5 left-4 hover:cursor-pointer rounded-sm hover:bg-gray-600 active:bg-gray-600"
      aria-label="Abrir menu"
    >
      <Icon class="text-gray-400 w-6 h-6" icon="ic:baseline-menu" />
    </button>
    <header
      class="h-16 flex gap-10 items-center p-4 border-b-1 border-gray-700"
    >
      <button
        @click="toggleSidebar"
        class="hover:cursor-pointer rounded-sm hover:bg-gray-600 active:bg-gray-600"
        aria-label="Fechar menu"
      >
        <Icon class="text-gray-400 w-6 h-6" icon="ic:baseline-menu" />
      </button>

      <h2 class="flex gap-1 text-gray-100 font-bold">
        <Icon class="text-gray-400 w-6 h-6" icon="ic:baseline-people-alt" />
        Chat App
      </h2>
    </header>
    <section class="flex-1 overflow-auto border-b-1 border-gray-700 p-4">
      <h3 class="text-gray-400 mb-4">Usuários na sala</h3>
      <div>
        <template v-for="user in currentUsers" :key="user">
          <UserCard :username="user" />
        </template>
      </div>
    </section>
    <section class="flex-1 overflow-auto p-4">
      <h3 class="text-gray-400 mb-4">Grupos</h3>
      <div>
        <GroupCard />
      </div>
    </section>
  </aside>
</template>
