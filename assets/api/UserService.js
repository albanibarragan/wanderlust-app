import API from "./api";

export const getUserById = async (id) => {
  if (!id) {
    throw new Error("❌ ID de usuario no proporcionado");
  }

  const response = await API.get("/user/user", {
    params: { _id: id },
  });

  return response.data.user;
};

export const restorePassword = async (email) => {
  try {
    const response = await API.post("/auth/restorePassword", {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al restaurar contraseña:", error);
    throw error.response?.data || { msg: "Error desconocido" };
  }
};