<script setup lang="ts">
defineProps({
  username: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-2 p-1 items-center rounded-sm hover:bg-gray-700">
    <div class="p-2 bg-gray-500 rounded-full">
      <Icon class="text-gray-200 w-6 h-6" icon="ic:baseline-person" />
    </div>
    <p class="text-gray-100">{{ username }}</p>
  </div>
</template>
