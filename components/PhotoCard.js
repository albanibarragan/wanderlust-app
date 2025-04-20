import { useNavigation } from "@react-navigation/native";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import { users } from "../assets/data/Mocks";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Reaction from "./Reaction"; 

export default function PhotoCard({ post, cardWidth }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const navigation = useNavigation();
  const user = users.find((u) => u.id === post.userId);

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const handlePost = () => {
    navigation.navigate('PostDetail', { post });
  };

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} >
      <ImageBackground
        source={{ uri: post.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <TouchableOpacity style={styles.favoriteButton} onPress={countLiked}>
          <Heart
            color={liked ? "red" : "white"}
            fill={liked ? "red" : "none"}
            size={20}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.username}>@{user.username}</Text>

          <View style={styles.bottomRow}>
            <Reaction
              icon={
                <Heart
                  color={liked ? "red" : "#fff"}
                  fill={liked ? "red" : "none"}
                  size={18}
                />
              }
              count={likeCount}
              countColor ={"#fff"}
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
