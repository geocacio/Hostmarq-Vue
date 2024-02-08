import type { Auth } from "@/types/authType";
import { defineStore } from "pinia";
import { login } from "@/api/authAPI";

export const useAuthStore = defineStore({
  id: "auth",

  state: (): Auth => ({
    token: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {

    setToken(token: string | null) {
      localStorage.setItem("authToken", token || "");
      this.token = localStorage.getItem("authToken") || null;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      return true;
    },
    
    async login(email: string, password: string) {
        try {
            const response = await login(email, password);
            const token = response.access_token;
            this.setToken(token);
            localStorage.setItem("userData", JSON.stringify(response.user));
            this.user = response.user;
            return "ok";
        } catch (error) {
            return error;
        }
    }
  },
});
