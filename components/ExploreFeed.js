import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PhotoCard from "../components/PhotoCard";
import { getAllPostsAPI } from '../assets/api/postService';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const cardWidth = screenWidth / 2 - 20;

export default function ExploreFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPostsAPI();
        console.log("Publicaciones:", allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error(
          "Error al obtener publicaciones:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PhotoCard post={item} cardWidth={cardWidth} />}
          keyExtractor={(item) => item._id?.toString() || item.id?.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          windowSize={10}
        />
      ) : (
        <Text style={styles.emptyText}>No hay publicaciones disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: cardMargin,
  },
  listContent: {
    paddingBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },
});
