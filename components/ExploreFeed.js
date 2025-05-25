import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { getPostsWithMedia } from "../assets/api/PostService";
import { Dimensions } from "react-native";
import PhotoCard from "../components/PhotoCard";
import { useFocusEffect } from "@react-navigation/native";

const numColumns = 2;
const cardMargin = 8;
const cardWidth =
  (Dimensions.get("window").width - cardMargin * (numColumns + 1)) / numColumns;

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
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#FF5C5C"
        style={{ marginTop: 50 }}
      />
    );
  }

  if (error) {
    return (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={fetchPosts}>
          <Text style={{ color: "#FF5C5C", marginTop: 10 }}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
  };
  return (
    <FlatList
      data={posts}
      numColumns={numColumns}
      keyExtractor={(item, index) =>
        item.post?._id?.toString() || index.toString()
      }
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: cardMargin,
      }}
      contentContainerStyle={{ padding: cardMargin }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF5C5C"]}
          tintColor="#FF5C5C"
        />
      }
      renderItem={({ item }) => (
        <PhotoCard
          post={{
            ...item.post,
            image: item.media?.[0]?.url || null,
          }}
          cardWidth={cardWidth}
        />
      )}
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
