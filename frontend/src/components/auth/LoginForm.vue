<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { authService } from "../../services/auth.service";

const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");
const loginError = ref<string | null>(null);

const loginUser = async () => {
  loginError.value = null;

  try {
    const response = await authService.login({
      username: username.value,
      password: password.value,
    });

    if (response?.success) {
      // Login bem-sucedido, o authService já armazenou o usuário e pode ter redirecionado
      router.push("chat/Geral");
    } else {
      loginError.value = response?.message || "Erro ao tentar fazer login.";
    }
  } catch (error: any) {
    console.error("Erro durante o login:", error);
    loginError.value = error.message || "Erro ao conectar com o servidor.";
  }
};
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <img
      class="w-[260px] h-auto mb-4"
      src="../../assets/EcoVerde_Preto.png"
      alt="Logo"
    />
    <form
      @submit.prevent="loginUser"
      class="bg-white p-7 w-full sm:w-100 h-125 rounded-lg shadow-lg flex flex-col gap-4 justify-center"
    >
      <legend class="font-bold text-center text-2xl mb-6">
        Entrar em sua conta
      </legend>
      <div class="flex flex-col">
        <label for="login-username" class="text-gray-800 text-sm font-bold mb-1"
          >Nome de usuário:
        </label>
        <input
          v-model="username"
          autocomplete="username"
          type="text"
          name="login-username"
          id="login-username"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Digite seu nome de usuário"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="login-password" class="text-gray-800 text-sm font-bold mb-1"
          >Senha:
        </label>
        <input
          v-model="password"
          autocomplete="current-password"
          type="password"
          name="login-password"
          id="login-password"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Digite sua senha"
          required
        />
      </div>
       <p v-if="loginError" class="text-red-500 text-sm mt-1 text-center">{{ loginError }}</p>
      <button
        class="bg-gray-900 text-sm text-white py-1.5 hover:cursor-pointer hover:opacity-90 rounded-sm"
      >
        Entrar
      </button>

      <p class="text-center text-sm">
        Não tem uma conta?
        <RouterLink
          class="text-green-500 font-bold hover:text-green-600"
          to="/registro"
          >Criar conta</RouterLink
        >
      </p>
    </form>
  </div>
</template>
