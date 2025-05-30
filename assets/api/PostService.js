import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./api";

// Obtener todos los posts
export const getAllPosts = async () => {
  const token = await AsyncStorage.getItem("jwt");
  const response = await API.get("/post", {
    headers: {
      wanderlust_token: token,
    },
  });
  return response.data.posts;
};

export const getMediaByPostId = async (postId) => {
  const token = await AsyncStorage.getItem("jwt");
  const response = await API.get(`/media/post/${postId}`, {
    headers: {
      wanderlust_token: token,
    },
  });
  return response.data;
};

export const getPostsWithMedia = async () => {
  const posts = await getAllPosts();
  return posts;
};

export const createPost = async ({
  title,
  description,
  mediaFiles,
  tags = [],
  location = null,
}) => {
  const token = await AsyncStorage.getItem("wanderlust_token"); // Asegúrate que este es el nombre correcto

  const formData = new FormData();

  formData.append("title", title || "");
  formData.append("description", description || "");

  if (tags.length > 0) {
    formData.append("tags", tags.join(",")); // Backend espera un string separado por comas
  }

  if (location) {
    formData.append("locationDescription", location.description || "");
    formData.append("locationLatitude", location.latitude?.toString() || "");
    formData.append("locationLongitude", location.longitude?.toString() || "");
  }

  if (mediaFiles.length > 0) {
    const file = mediaFiles[0]; // Solo una imagen por ahora
    const uri = file.uri;
    const filename = uri.split("/").pop();
    const ext = /\.(\w+)$/.exec(filename)?.[1];
    const type = ext ? `image/${ext}` : "image/jpeg";

    formData.append("image", {
      uri,
      name: filename,
      type,
    });
  }

  const response = await API.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      wanderlust_token: token, 
    },
    timeout: 15000, 
  });

  console.log("✅ Respuesta del servidor:", response.data);
  return response.data;
};

export const getPostsByUserId = async (userId) => {
  const token = await AsyncStorage.getItem("jwt");

  const response = await API.get("/post/user", {
    params: { userId },
    headers: {
      wanderlust_token: token,
    },
  });

  const posts = response.data.posts;

  const postsWithMedia = await Promise.all(
    posts.map(async (post) => {
      const media = await getMediaByPostId(post._id);
      return { post, media };
    })
  );

  return postsWithMedia;
};