<script setup lang="ts">
defineProps({
  toggleForm: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <img
      class="w-[260px] h-auto mb-4"
      src="../../assets/EcoVerde_Preto.png"
      alt="Logo"
    />
    <form
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
          type="password"
          name="login-password"
          id="login-password"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button
        class="bg-gray-900 text-sm text-white py-1.5 hover:cursor-pointer hover:opacity-90 rounded-sm"
      >
        Entrar
      </button>

      <p class="text-center text-sm">
        Não tem uma conta?
        <a
          @click.prevent="toggleForm"
          class="text-green-500 font-bold hover:text-green-600"
          href="#"
          >Criar conta</a
        >
      </p>
    </form>
  </div>
</template>
