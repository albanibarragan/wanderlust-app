import API from "./api";

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await API.get(`/comment`, {
      params: { postId },
    });
    return response.data.comments; 
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    return [];
  }
};