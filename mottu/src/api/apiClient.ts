import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://172.20.10.2:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir o token automaticamente
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); 
    console.log("Token no interceptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config.headers)
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
