import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import UserHeader from "./UserHeader";
import Reaction from "./Reaction";
import { BookMarkedIcon, BookmarkIcon, Heart } from "lucide-react-native";
import { MessageCircle } from "react-native-feather";
import { users } from "../assets/data/Mocks";

export default function CardPost({ item }) {
  const { username, avatar, image, time, content, location, id, country } = item;
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(3022);
  const user = users.find((u) => u.id === item.userId);

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.mainImage} />
        <View style={styles.userInfoWrapper}>
          <UserHeader
           userId={item.userId}
            textColor = "#fff"
            time={item.time}
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.postContent}
            onPress={() => navigation.navigate("PostDetail", { post: item })}
          >
            <Text style={styles.postText} numberOfLines={4}>
              {content}
            </Text>
            <Text style={styles.postText} numberOfLines={4}>
              {location}, {country}
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
    elevation: 4,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden"
  },
  userInfoWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 4 / 5,
    resizeMode: "cover",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingTop: 15,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    
  },
  postContent: {
    flex: 1,
  },
  postText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
    flexWrap: "wrap",
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
    paddingHorizontal: 2,

  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  icon: {
    fontSize: 18,
    color: "#fff",
    marginRight: 4,
  },
  count: {
    fontSize: 14,
    color: "#fff",
  },
});
