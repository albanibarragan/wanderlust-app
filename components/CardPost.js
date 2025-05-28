import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Reaction from "./Reaction";
import { users, currentUser } from "../assets/data/Mocks";

export default function CardPost({ item }) {
  console.log("🧩 item en CardPost:", item);
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes?.length || 0);

const user =
  item.userId?._id === currentUser.id || item.userId === currentUser.id
    ? currentUser
    : {
        id: item.userId?._id || item.userId,
        username: item.userId?.username || "desconocido",
        avatar: item.userId?.profilePicture || "https://via.placeholder.com/100",
        location: item.locationDescription || "",
      };

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const handlePostPress = () => {
    navigation.navigate("PostDetail", { post: item, user });
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={{ uri: item.image || "https://via.placeholder.com/500" }}
          style={styles.mainImage}
          imageStyle={styles.imageStyle}
        >
          {user && (
            <View style={styles.userHeaderWrapper}>
              <View style={styles.userInfo}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userText}>
                  <Text style={styles.username}>
                    {user.id === "me" ? "Tú" : `@${user.username}`}
                  </Text>
                  <Text style={styles.time}>
                    {item.time || new Date(item.createdAt).toLocaleString()}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="more-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.postContent}
            onPress={handlePostPress}
          >
            <Text style={styles.postText} numberOfLines={3}>
              {item.content || item.description || item.title || "Sin contenido"}
            </Text>
            <Text style={styles.postText} numberOfLines={1}>
              {item.location?.description || "Ubicación no disponible"},{" "}
              {item.country || "País desconocido"}
            </Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            <Reaction
              icon={
                <Icon name="heart" size={20} color={liked ? "red" : "#fff"} />
              }
              count={likeCount}
              countColor="#fff"
              onIconPress={countLiked}
            />
            <Reaction
              icon={<Icon name="message-circle" size={20} color="#fff" />}
              count={3022}
              countColor="#fff"
            />
            <Reaction
              icon={<Icon name="bookmark" size={20} color="#fff" />}
              countColor="#fff"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 7,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    aspectRatio: 4 / 5,
    justifyContent: "space-between",
  },
  imageStyle: {
    borderRadius: 20,
  },
  userHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin: 8,
    borderRadius: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    justifyContent: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  time: {
    color: "#ccc",
    fontSize: 12,
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  postContent: {
    flex: 1,
  },
  postText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 8,
    gap: 6,
  },
});
