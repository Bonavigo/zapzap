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
  <section class="news-section">
    <div class="news-container">
      <div class="header">
        <RouterLink class="back-link" to="/chat/geral">
          <Icon class="w-4 h-4" icon="ic:baseline-arrow-back" />
          Voltar
        </RouterLink>
        <h2>FIQUE POR DENTRO DAS NOTICIAS E ACONTECIMENTOS AMBIENTAIS.<br>
          PARA INFORMAÇÕES COMPLETAS, ACESSE O LINK DENTRO DAS NOTICIAS</h2>
      </div>
      <div class="news-grid">
        <template v-for="news in newsList" :key="news">
          <div class="news-card">
            <h3>{{ news.title }}</h3>
            <div class="news-content">
              <p>{{ news.content }}</p>
            </div>
            <div class="hidden-content">
              <p>{{ news.description }}</p>
              <a :href="news.links" target="_blank" class="read-more">Ver notícia completa</a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  padding: 2rem 1rem;
}

.news-container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.back-link {
  position: absolute;
  left: 8;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 1;
}

h2 {
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
  margin: 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  padding: 1.5rem;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.news-card h3 {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.news-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

.hidden-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  margin-top: 1rem;
}

.news-card:hover .hidden-content {
  max-height: 500px;
  opacity: 1;
}

.hidden-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .news-section {
    padding: 1rem;
  }

  .header {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-card {
    margin: 0;
  }
}
</style>