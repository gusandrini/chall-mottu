import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://mottu-java.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // remove sessão
      await AsyncStorage.multiRemove(['userId', 'token']);
      // opcional: emitir evento global para redirecionar p/ Login
      console.log("Sessão expirada, faça login novamente.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
