import { ref } from "vue";
import { IAuthResponse } from "../interfaces/auth-response.interface";
import { IUserCredentials } from "../interfaces/user-credentials.interface";
import router from "../router";
import { apiClientService } from "./api-client.service";

class AuthService {
  private userCredentials = ref<IUserCredentials | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  getUser(): IUserCredentials | null {
    return this.userCredentials.value;
  }

  private setUser(userData: IUserCredentials): void {
    this.userCredentials.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  loadUserFromStorage() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        this.userCredentials.value = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }

  async login(credentials: IUserCredentials): Promise<IAuthResponse> {
    try {
      const response = await apiClientService.post("/users/login", credentials);

      // Store user on successful login
      this.setUser(credentials);

      return {
        success: true,
        message: response as string,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Falha ao tentar fazer login.",
      };
    }
  }

  async register(credentials: IUserCredentials): Promise<IAuthResponse> {
    try {
      const response = await apiClientService.post(
        "/users/register",
        credentials
      );

      return {
        success: true,
        message: response as string,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data,
      };
    }
  }

  logout(): void {
    this.userCredentials.value = null;
    localStorage.removeItem("user");
    router.push("/");
  }
}

export const authService = new AuthService();
