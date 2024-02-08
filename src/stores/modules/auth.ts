import type { Auth } from "@/types/authType";
import { defineStore } from "pinia";
import { login } from "@/api/authAPI";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore({
  id: "auth",

state: (): Auth => ({
    token: localStorage.getItem("authToken") || "",
    user: JSON.parse(localStorage.getItem("userData") ?? ""),
}),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {

    setToken(token: string | null) {
      localStorage.setItem("authToken", token || "");
      this.token = localStorage.getItem("authToken") || "";
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");

      router.push({ name: "Login" });
    },
    
    async login(email: string, password: string) {
        try {
            const response = await login(email, password);
            const token = response.access_token;
            this.setToken(token);
            localStorage.setItem("userData", JSON.stringify(response.user));
            this.user = response.user;

            router.push({ name: "Dashboard" });
        } catch (error) {
            return error;
        }
    }
  },
});
