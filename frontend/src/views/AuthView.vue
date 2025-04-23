<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

const showLoginForm = ref(false);

const toggleForm = () => {
  showLoginForm.value = !showLoginForm.value;
};
</script>

<template>
  <div
    class="bg-neutral-100 h-screen w-screen flex justify-center items-center"
  >
    <div v-if="showLoginForm">
      <LoginForm :toggleForm="toggleForm" />
    </div>
    <div v-else>
      <RegisterForm :toggleForm="toggleForm" />
    </div>
  </div>
</template>

<style scoped></style>
