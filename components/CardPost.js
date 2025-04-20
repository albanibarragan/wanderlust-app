import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import UserHeader from "./UserHeader";
import Reaction from "./Reaction";
import { BookmarkIcon, Heart } from "lucide-react-native";
import { MessageCircle } from "react-native-feather";
import { users, currentUser } from "../assets/data/Mocks";

export default function CardPost({ item }) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);

  const user = item.userId === currentUser.id
    ? currentUser
    : users.find((u) => u.id === item.userId) || null;

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
        <ImageBackground source={{ uri: item.image }} style={styles.mainImage} imageStyle={styles.imageStyle}>
          {user && (
            <TouchableOpacity style={styles.userInfoWrapper}>
              <View style={styles.userInfo}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.username}>
                    {user.id === "me" ? "Tú" : `@${user.username}`}
                  </Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={styles.content}>
          <TouchableOpacity style={styles.postContent} onPress={handlePostPress}>
            <Text style={styles.postText} numberOfLines={3}>{item.content}</Text>
            <Text style={styles.postText} numberOfLines={1}>
              {item.location}, {item.country}
            </Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            <Reaction
              icon={
                <Heart
                  size={20}
                  color={liked ? "red" : "#fff"}
                  fill={liked ? "red" : "none"}
                />
              }
              count={likeCount}
              countColor="#fff"
              onIconPress={countLiked}
            />
            <Reaction
              icon={<MessageCircle color="#fff" />}
              count={3022}
              countColor="#fff"
              size={20}
            />
            <Reaction
              icon={<BookmarkIcon color="#fff" />}
              countColor="#fff"
              size={20}
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
  userInfoWrapper: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    margin: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
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
