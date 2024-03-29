import axios from "axios";

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await authAPI.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (formData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await authAPI.post("/register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
