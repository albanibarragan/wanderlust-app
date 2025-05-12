import api from "./api";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const register = async (firstName, email, password, phone) => {
  const res = await api.post("/auth/register", {
    firstName,
    email,
    password,
    phone 
  });
  return res.data;
};
