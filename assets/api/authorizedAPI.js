import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URLL } from "@env";

export const getAuthorizedAPI = async () => {
  const token = await AsyncStorage.getItem("jwt");
  return axios.create({
    baseURL: API_URLL, // reemplaza con tu base real
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};