import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dirección del servidor
const BASE_URL = "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Token JWT
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
