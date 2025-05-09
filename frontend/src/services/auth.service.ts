import { ref } from "vue";
import router from "../router";
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Ajuste para a URL do seu servidor Spring Boot

class AuthService {
  private user = ref<string | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  getUser(): string | null {
    return this.user.value;
  }

  private setUser(userData: string): void {
    this.user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  loadUserFromStorage() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        this.user.value = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }

  async login(userData: { username: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      if (response.status === 200) { // Login bem-sucedido geralmente retorna 200 OK
        this.setUser(userData.username);
        return { success: true, message: response.data };
      } else {
        return { success: false, message: response.data };
      }
    } catch (error: any) {
      console.error("Erro durante o login:", error.response ? error.response.data : error.message);
      return { success: false, message: error.response?.data || "Erro ao tentar fazer login." };
    }
  }

  async register(userData: { username: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data; // Espera-se a mensagem "User registrado com sucesso!"
    } catch (error: any) {
      console.error("Erro durante o registro:", error.response ? error.response.data : error.message);
      return { success: false, message: error.response?.data || "Erro ao tentar registrar." };
    }
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/users/check?username=${username}`);
      return response.data; // Espera-se que o backend retorne 'true' ou 'false'
    } catch (error: any) {
      console.error("Erro ao verificar nome de usuário:", error.response ? error.response.data : error.message);
      return true; // Em caso de erro, para evitar registros duplicados, você pode retornar true (ou tratar o erro de forma mais específica)
    }
  }

  logout(): void {
    this.user.value = null;
    localStorage.removeItem("user");
    router.push("/");
  }
}

export const authService = new AuthService();