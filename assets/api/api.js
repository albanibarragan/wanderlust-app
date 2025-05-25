import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLL } from '@env';

const API = axios.create({
   baseURL: API_URLL,  
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.wanderlust_token = token;
  }

  return config;
});

export default API;
