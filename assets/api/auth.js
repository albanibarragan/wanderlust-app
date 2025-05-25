import API from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async ({ email, password }) => {
  try {
    const res = await API.post("/auth/login", { email, password });

    console.log("🧪 Login response:", res.data);

    const token = res.data?.token;
    const userId = res.data?.user?.iduser;

    console.log("🔐 Token recibido:", token);
    console.log("🆔 userId recibido:", userId);

    if (token && userId) {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId);
      console.log("✅ Token y userId guardados");
    } else {
      console.error("❌ token o userId faltan en la respuesta");
    }

    return res.data;

  } catch (error) {
    console.error("❌ ERROR EN LOGIN:", error);
  }
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