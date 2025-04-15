import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import CommentsScreen from "./CommentsScreen";
import BottomSheet from "@gorhom/bottom-sheet";
import { Heart, MessageCircle } from "lucide-react-native";
import { Modal } from "react-native-web";
import LikeModal from "../components/LikeModal";

const hashtags = [
  "Recife",
  "Brasil",
  "ArteUrbano",
  "Viajes",
  "Wanderlust",
  "Aventura",
];



export default function Details({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const handleBack = () => navigation.goBack();

  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState(3022);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const [modalLikeVisible, setModalLikeVisible] = useState(false);

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const handleCommentPress = () => {
    setModalCommentVisible(true);
  };

  const handleLikePress = () => {
    setModalLikeVisible(true);
  };

  const handleHashtagPress = (tag) => {
    console.log('Hashtag presionado:', tag);
  
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton onPress={handleBack} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.location}>{post.location}</Text>
          </View>
          <Text style={styles.timeAgo}>{post.time}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.description}>{post.fullContent}</Text>
          <View style={styles.hashtagsContainer}>
            {hashtags.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => handleHashtagPress(tag)}
              >
                <Text style={styles.hashtag}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <TouchableOpacity style={styles.icon} onPress={countLiked}>
              <Heart color={liked ? 'red' : 'gray'} fill={liked ? 'red' : 'none'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={handleLikePress}>
              <Text style={styles.count}>3,022</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reactionItem}>
            <TouchableOpacity style={styles.icon} onPress={handleCommentPress}>
            <MessageCircle color="#555" />
              <Text style={styles.count}>3,022</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CommentsModal
        visible={modalCommentVisible}
        onClose={() => setModalCommentVisible(false)}
        comments={[
          { user: "Maria", text: "¡Qué buena foto!" },
          { user: "Luis", text: "Me encanta este lugar." },
        ]}
      />
      <LikeModal
        visible={modalLikeVisible}
        onClose={() => setModalLikeVisible(false)}
        Likes={[{ user: "Maria" }, { user: "Luis" }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 450,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  location: {
    color: "gray",
    fontSize: 13,
  },
  timeAgo: {
    marginLeft: "auto",
    fontSize: 12,
    color: "gray",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    color: "#333",
  },
  hashtags: {
    color: "#8b5cf6", // violeta
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 30,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  count: {
    marginLeft: 6,
    fontSize: 14,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  
  hashtag: {
    marginRight: 8,
    color: '#4f4f4f',
    fontWeight: 'bold',
  },
});
