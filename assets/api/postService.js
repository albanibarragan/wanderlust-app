import API from './api';

export const createPostAPI = async (postData) => {
  const res = await API.post('/post', postData); 
  return res.data;
};

export const getAllPostsAPI = async () => {
  const res = await API.get('/post');
  return res.data.posts;
};

export const getPostByIdAPI = async (postId) => {
  const res = await API.get(`/post/${postId}`);
  return res.data; 
};

// Obtener publicaciones del usuario actual (token)
export const getUserPostsAPI = async () => {
  const res = await API.get('/post/user');
  return res.data.posts;
};