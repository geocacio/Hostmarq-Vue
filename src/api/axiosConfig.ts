import axios from "axios";
import { useAuthStore } from "@/stores/modules/auth";

const authStore = useAuthStore();

// Configuração do Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// Interceptor para adicionar o token de autorização a cada solicitação
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;