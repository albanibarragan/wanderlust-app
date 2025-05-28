
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./api";

export const login = async ({ email, password }) => {
  const res = await API.post("/auth/login", { email, password });

  const token = res.data.token;

  if (token) {
    await AsyncStorage.setItem("jwt", token); // 
    console.log("✅ Token guardado correctamente:", token);
  } else {
    console.error("❌ No se recibió el token en la respuesta del login");
  }

  return res.data;
};

export const register = async ({ firstName, lastName, email, password, phone, birthday, username, bio }) => {
  const res = await API.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
    phone,
    birthday,
    username,
     bio
  });
  return res.data;
};

export const getCurrentUserId = async () => {
  const userId = await AsyncStorage.getItem("userId");
  console.log("🆔 userId recuperado:", userId);
  if (!userId) {
    console.warn("⚠️ No se encontró userId en AsyncStorage");
    return null;
  }
  return userId;
};