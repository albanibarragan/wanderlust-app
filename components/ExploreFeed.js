import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URLL } from '@env';

const ExploreFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const fetchPosts = async () => {
    try {
      setError(null);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        setError("No se ha iniciado sesión");
        setLoading(false);
        return;
      }

      const apiUrl = API_URLL || 'http://192.168.20.119:8080/api';
      const response = await axios.get(`${apiUrl}/post`, {
        headers: { wanderlust_token: token }
      });
      
      // Verificamos si la respuesta contiene los posts
      if (response.data && response.data.posts) {
        // Guardamos los posts primero
        const fetchedPosts = response.data.posts;
        setPosts(fetchedPosts);
        
        // Ahora obtenemos los medios para cada post
        await fetchMediaForPosts(fetchedPosts, token, apiUrl);
      } else {
        console.warn("Formato de respuesta inesperado:", response.data);
        setPosts([]);
      }
      
    } catch (err) {
      console.error("Error al obtener publicaciones:", err);
      setError("No se pudieron cargar las publicaciones. Intente nuevamente.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchMediaForPosts = async (postsArray, token, apiUrl) => {
    try {
      console.log("Iniciando fetchMediaForPosts para", postsArray.length, "posts");
      
      // Creamos un array de promesas para obtener el media de cada post
      const mediaPromises = postsArray.map(post => 
        axios.get(`${apiUrl}/media/post/${post._id}`, {
          headers: { wanderlust_token: token }
        })
        .then(response => {
          // Imprimimos la respuesta completa para depuración
          console.log(`Respuesta media para post ${post._id}:`, JSON.stringify(response.data));
          
          // Verificamos si la respuesta tiene la estructura esperada
          if (response.data) {
            // Manejamos diferentes posibles estructuras de respuesta
            let mediaItems = [];
            
            // Caso 1: La respuesta tiene un array 'media'
            if (response.data.media && Array.isArray(response.data.media)) {
              mediaItems = response.data.media;
            } 
            // Caso 2: La respuesta es directamente un array
            else if (Array.isArray(response.data)) {
              mediaItems = response.data;
            }
            // Caso 3: La respuesta es un objeto único
            else if (response.data.url) {
              mediaItems = [response.data];
            }
            
            if (mediaItems.length > 0) {
              console.log(`Encontrados ${mediaItems.length} archivos media para post ${post._id}`);
              return {
                postId: post._id,
                media: mediaItems
              };
            }
          }
          console.log(`No se encontraron medios para post ${post._id}`);
          return null;
        })
        .catch(error => {
          console.log(`Error al obtener media para post ${post._id}:`, error);
          return null;
        })
      );
      
      // Esperamos a que todas las promesas se resuelvan
      const mediaResults = await Promise.all(mediaPromises);
      console.log("Resultados de media obtenidos:", mediaResults.filter(Boolean).length);
      
      // Actualizamos los posts con sus respectivos medios
      setPosts(currentPosts => {
        const updatedPosts = currentPosts.map(post => {
          const postMedia = mediaResults.find(media => 
            media && media.postId && post._id && media.postId.toString() === post._id.toString()
          );
          
          if (postMedia) {
            console.log(`Asignando media a post ${post._id}`);
            return { ...post, media: postMedia.media };
          }
          return post;
        });
        
        console.log("Posts actualizados con media:", updatedPosts.filter(p => p.media).length);
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error al obtener medios para posts:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => {
    // Verificamos si el post tiene contenido necesario para mostrarse
    if (!item.post || !item.post.userId) {
      return null;
    }

    
    // if (item.media) {
    //   console.log("URL de imagen:", item.media.url);
    // }

    return (
      <View style={styles.postContainer}>
        {/* Encabezado del post con información del usuario */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>
                {item.post.userId.username ? item.post.userId.username.charAt(0).toUpperCase() : "?"}
              </Text>
            </View>
            <View>
              <Text style={styles.username}>{item.post.userId.username || "Usuario"}</Text>
              <Text style={styles.postDate}>{formatDate(item.post.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#777" />
          </TouchableOpacity>
        </View>
        
        {/* Título del post si existe */}
        {item.post.title && <Text style={styles.postTitle}>{item.post.title}</Text>}
        
        {/* Descripción del post */}
        {item.post.description && (
          <Text style={styles.postDescription}>{item.post.description}</Text>
        )}
        
        {/* Imagen del post si existe - con verificación más robusta */}
        {item.media && (
          <View>
            <Image 
              source={{ uri: item.media.url }} 
              style={styles.postImage}
              resizeMode="cover"
              onLoad={() => console.log("Imagen cargada correctamente:", item.media.url)}
              onError={(error) => console.error("Error al cargar imagen:", error.nativeEvent.error)}
            />
          </View>
        )}
        
        {/* Ubicación si existe */}
        {item.location && item.location.description && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.locationText}>{item.location.description}</Text>
          </View>
        )}
        
        {/* Etiquetas si existen */}
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tagItem, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tagItem.tag}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Acciones del post */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="heart" size={22} color="#777" />
            <Text style={styles.actionText}>Me gusta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="comment-o" size={22} color="#777" />
            <Text style={styles.actionText}>Comentar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="sharealt" size={22} color="#777" />
            <Text style={styles.actionText}>Compartir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF5C5C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="document-text-outline" size={50} color="#ccc" />
        <Text style={styles.emptyText}>No hay publicaciones disponibles</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.feedContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF5C5C"]}
          tintColor="#FF5C5C"
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    padding: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  retryButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FF5C5C",
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF5C5C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postDate: {
    color: "#777",
    fontSize: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    color: "#777",
    marginLeft: 4,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: "#555",
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    marginLeft: 6,
    color: "#777",
    fontSize: 14,
  },
});

export default ExploreFeed;