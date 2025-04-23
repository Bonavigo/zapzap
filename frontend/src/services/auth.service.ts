import { ref } from "vue";
import router from "../router";
class AuthService {
  private user = ref<string | null>(null);

  constructor() {
    // Restore user from localStorage on service initialization
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

  login(username: string) {
    this.setUser(username);
  }

  register(username: string) {
    this.setUser(username);
  }

  logout(): void {
    this.user.value = null;
    localStorage.removeItem("user");
    router.push("/");
  }
}

export const authService = new AuthService();
