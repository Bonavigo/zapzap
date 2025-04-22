<script setup lang="ts">
defineProps({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="z-2 self-end max-w-80 bg-gray-700 p-2 rounded-lg">
    <dt class="text-gray-300 text-base font-bold break-words">{{ sender }}</dt>
    <dd class="text-gray-300 text-sm break-words">{{ content }}</dd>
  </div>
</template>
