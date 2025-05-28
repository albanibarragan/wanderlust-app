import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPostsWithMedia } from "../assets/api/PostService";
import PhotoCard from "../components/PhotoCard";

const numColumns = 2;
const cardMargin = 10;
const screenWidth = Dimensions.get("window").width;

const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

const ExploreFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setError(null);
      const data = await getPostsWithMedia();
      setPosts(data);
    } catch (err) {
      console.error("❌ Error al cargar publicaciones:", err);
      setError("No se pudieron cargar las publicaciones.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF5C5C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={fetchPosts}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      numColumns={numColumns}
      keyExtractor={(item, index) =>
        item.post?._id?.toString() || index.toString()
      }
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF5C5C"]}
          tintColor="#FF5C5C"
        />
      }
      renderItem={({ item }) => {
        const { post, media } = item;

        return (
          <PhotoCard
            post={{
              ...post,
              image: media?.[0]?.url || null,
              content: post.description || "", 
              likes: post.likes || [], 
              user: post.userId || { username: "anon" }, 
            }}
            cardWidth={cardWidth}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    padding: cardMargin,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  retryText: {
    color: "#FF5C5C",
    marginTop: 10,
    fontWeight: "500",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: cardMargin,
    marginBottom: cardMargin,
  },
  contentContainer: {
    paddingTop: cardMargin,
    paddingBottom: 80,
  },
});

export default ExploreFeed;
