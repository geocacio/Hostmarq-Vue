import type { Auth } from "@/types/authType";
import type { Role } from "@/types/roleType";
import type { Permission } from "@/types/permissionType";
import { defineStore } from "pinia";
import { login } from "@/api/authAPI";

export const useAuthStore = defineStore({
  id: "auth",

state: (): Auth => ({
    token: localStorage.getItem("authToken") || "",
    user: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : "",
    userRoles: [],
    userPermissions: [],
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
      this.userRoles = [];
      this.userPermissions = [];
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

            // Extrair roles e permissões do usuário
            this.userRoles = response.user.roles.map((role: Role) => role.name);
            this.userPermissions = response.user.roles.flatMap((role: Role) => role.permissions.map((permission: Permission) => permission.name));

            return true
        } catch (error) {
            return error;
        }
    }
  },
});
