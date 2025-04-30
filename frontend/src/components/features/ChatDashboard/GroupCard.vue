<script setup lang="ts">
const props = defineProps({
  roomId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["selectChatRoom"]);

const selectChatRoom = () => {
  emit("selectChatRoom", props.roomId);
};
</script>

<template>
  <div
    @click="selectChatRoom"
    class="group flex gap-1 items-center hover:cursor-pointer active:bg-gray-600 hover:bg-gray-700 p-2 rounded-md"
  >
    <Icon class="text-gray-400 w-4 h-4" icon="mdi:message-outline" />
    <p class="group-hover:text-gray-200 text-gray-400">{{ props.roomId }}</p>
  </div>
</template>
