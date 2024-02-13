import axios from "axios";
import { useAuthStore } from "@/stores/modules/auth";

const authStore = useAuthStore();

// Configuração do Axios
const axiosInstance = axios.create({
  //baseURL: import.meta.env.VUE_APP_BASE_URL,
  //baseURL: process.env.VUE_APP_BASE_URL,
  baseURL:  'http://127.0.0.1:8000/',
  //baseURL:  'https://api-teste.ddns.net/',
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