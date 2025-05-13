import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const API = axios.create({
  baseURL: "http://192.168.0.101:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      config.headers["wanderlust_token"] = token; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
