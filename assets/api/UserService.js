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