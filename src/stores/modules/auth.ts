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
    userRoles: localStorage.getItem("userRoles") ? JSON.parse(localStorage.getItem("userRoles")!) : [],
    userPermissions: localStorage.getItem("userPermissions") ? JSON.parse(localStorage.getItem("userPermissions")!) : [],
  }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getRole: (state) => state.userRoles,
        getUser: (state) => state.user,
        getPermissions: (state) => state.user.roles[0].permissions,
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
            localStorage.clear();

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

                // Armazenar roles e permissões do usuário no localStorage
                localStorage.setItem("userRoles", JSON.stringify(this.userRoles));
                localStorage.setItem("userPermissions", JSON.stringify(this.userPermissions));

                return true
            } catch (error) {
                return error;
            }
        }
    },
});
