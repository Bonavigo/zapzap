<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import GroupCard from "../features/ChatDashboard/GroupCard.vue";
import UserCard from "../features/ChatDashboard/UserCard.vue";

import { IChatRoom } from "../../interfaces/chat-room.interface";

const props = defineProps<{
  users: string[];
  chatRooms: IChatRoom[];
}>();

const isOpen = ref<boolean>(true);

const toggleSidebar = () => {
  if (window.innerWidth > 640 && isOpen.value) {
    return;
  }
  isOpen.value = !isOpen.value;
};

const handleResize = () => {
  const isMobile = window.innerWidth < 640;

  if (!isMobile) {
    isOpen.value = true;
  }
};

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
        <template v-for="user in props.users" :key="user">
          <UserCard :username="user" />
        </template>
      </div>
    </section>
    <section class="flex-1 overflow-auto p-4">
      <h3 class="text-gray-400 mb-4">Grupos</h3>
      <div>
        <template v-for="chatRoom in props.chatRooms" :key="chatRoom.id">
          <GroupCard :roomId="chatRoom.id" />
        </template>
      </div>
    </section>
  </aside>
</template>
