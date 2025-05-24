import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Reaction from "./Reaction";

export default function PhotoCard({ post, cardWidth }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const navigation = useNavigation();

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const handlePost = () => {
    navigation.navigate("PostDetail", { post });
  };

  const username = post.userId?.username || "usuario";
  const imageUrl = post.image || post.media?.[0]?.url || null;

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={handlePost}>
      <ImageBackground
        source={imageUrl ? { uri: imageUrl } : require("../assets/placeholder.jpg")}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <TouchableOpacity style={styles.favoriteButton} onPress={countLiked}>
          <Icon
            name="heart"
            size={20}
            color={liked ? "red" : "white"}
            solid={liked}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.username}>@{username}</Text>

          <View style={styles.bottomRow}>
            <Reaction
              icon={
                <Icon
                  name="heart"
                  size={18}
                  color={liked ? "red" : "#fff"}
                  solid={liked}
                />
              }
              count={likeCount}
              countColor={"#fff"}
              onIconPress={countLiked}
            />
            <TouchableOpacity style={styles.seeMoreButton} onPress={handlePost}>
              <Text style={styles.seeMoreText}>Más</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  imageBackground: {
    width: "100%",
    height: Math.random() * (350 - 280) + 280,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 20,
  },
  favoriteButton: {
    alignSelf: "flex-end",
    margin: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    color: "#ddd",
    fontSize: 12,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
  },
  seeMoreButton: {
    backgroundColor: "#FF6B4A",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  seeMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
