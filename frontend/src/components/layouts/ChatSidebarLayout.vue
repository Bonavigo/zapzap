<script setup lang="ts">
import UserCard from "@/components/features/ChatDashboard/UserCard.vue";
import GroupCard from "@/components/features/ChatDashboard/GroupCard.vue";
</script>

<template>
  <aside class="bg-gray-800 overflow-auto">
    <header
      class="h-16 flex gap-20 items-center p-4 border-b-1 border-gray-700"
    >
      <h2 class="flex gap-1 text-gray-100 font-bold">
        <Icon class="text-gray-400 w-6 h-6" icon="ic:baseline-people-alt" />
        Chat App
      </h2>
      <Icon
        class="text-gray-400 w-6 h-6 rounded-sm hover:cursor-pointer hover:bg-gray-600 active:bg-gray-600"
        icon="ic:baseline-menu"
      />
    </header>
    <section class="border-b-1 border-gray-700 p-4">
      <h3 class="text-gray-400 mb-4">Usuários na sala</h3>
      <div>
        <UserCard />
      </div>
    </section>
    <section class="p-4">
      <h3 class="text-gray-400 mb-4">Grupos</h3>
      <div>
        <GroupCard />
      </div>
    </section>
  </aside>
</template>
