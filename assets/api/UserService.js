import API from "./api";

export const getMyProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};