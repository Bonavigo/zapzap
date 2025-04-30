<script setup lang="ts">
import { onMounted, ref } from "vue";
import NewsCard from "../components/NewsCard.vue";

import { RouterLink } from "vue-router";
import { INews } from "../interfaces/news.interface";
import { newsService } from "../services/news.service";

const newsList = ref<INews[]>([]);

onMounted(async () => {
  try {
    const response = await newsService.getAllNews();
    newsList.value = response || [];
  } catch (err) {
    console.error("Erro ao buscar por notícias", err);
  }
});
</script>
<template>
  <section class="flex justify-center bg-gray-800">
    <div class="p-5 bg-gray-900">
      <div>
        <RouterLink
          class="text-gray-300 flex gap-2 items-center hover:text-gray-200 active:text-gray-100 hover:underline active:underline"
          to="/chat/geral"
          ><Icon class="w-4 h-4" icon="ic:baseline-arrow-back" />
          Voltar</RouterLink
        >
        <h2 class="mb-8 text-center text-gray-100 text-2xl text-bold">
          Principais notícias
        </h2>
      </div>
      <div class="flex gap-12 flex-wrap justify-center max-w-[1060px]">
        <template v-for="news in newsList" :key="news">
          <NewsCard :title="news.title" :content="news.content"></NewsCard>
        </template>
      </div>
    </div>
  </section>
</template>
