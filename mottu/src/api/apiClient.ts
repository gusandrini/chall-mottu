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
