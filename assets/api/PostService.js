// src/services/PostService.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./api";

// Obtener todos los posts
export const getAllPosts = async () => {
  const response = await API.get("/post");
  return response.data.posts;
};

// Obtener media de un post
export const getMediaByPostId = async (postId) => {
  const response = await API.get(`/media/post/${postId}`);
  return response.data;
};

// Obtener posts con media ya incluida
export const getPostsWithMedia = async () => {
  const posts = await getAllPosts();

  const enriched = await Promise.all(
    posts.map(async (post) => {
      try {
        const media = await getMediaByPostId(post._id);
        return { ...post, media };
      } catch {
        return { ...post, media: [] }; // Si falla el media, igual se retorna el post
      }
    })
  );

  return enriched;
};
export const createPost = async ({ title, description, mediaFiles, tags, location }) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("No has iniciado sesión");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  if (tags && tags.length > 0) {
    formData.append("tags", tags.join(",")); // por ejemplo: ["paisaje", "globos"]
  }

  if (location) {
    formData.append("locationDescription", location.description || "");
    formData.append("locationLatitude", location.latitude?.toString() || "");
    formData.append("locationLongitude", location.longitude?.toString() || "");
  }

  if (mediaFiles?.length > 0) {
    const file = mediaFiles[0];
    const filename = file.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";

    formData.append("image", {
      uri: file.uri,
      name: filename,
      type,
    });
  }

  const response = await API.post("/post", formData, {
    headers: {
      wanderlust_token: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};