<script setup lang="ts">
const props = defineProps({
  title: String,
  content: String,
});
</script>
<template>
  <article class="bg-gray-800 text-gray-100">
    <h3 class="font-bold mb-2">{{ props.title }}</h3>
    <p>{{ props.content }}</p>
  </article>
</template>
