import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Heart, MessageCircle } from "lucide-react-native";
import { Modal } from "react-native-web";
import { StatusBar } from "expo-status-bar";
import UserInfo from "../components/UserInfo";
import HashtagList from "../components/HashtagList";
import Reaction from "../components/Reaction";
import ModalPost from "../components/ModalPost";
import likes from "../assets/data/Mocks"
import comments from "../assets/data/Mocks"

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
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const countLiked = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const handleCommentPress = () => {
    setShowComments(true);
  };

  const handleLikePress = () => {
    setShowLikes(true);
  };

  const handleHashtagPress = (tag) => {
    console.log("Hashtag presionado:", tag);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={handleBack} />
        <Image source={{ uri: post.image }} style={styles.image} />
        <UserInfo
          user={{
            avatar: post.avatar,
            username: post.username,
            location: post.location,
            time: post.time,
          }}
        />
        <View style={styles.postBody}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.description}>{post.fullContent}</Text>
          <HashtagList tags={hashtags} onPress={handleHashtagPress} />
        </View>
        {/* reacciones  */}
        <View style={styles.reactions}>
          <Reaction
            icon={
              <Heart
                color={liked ? "red" : "gray"}
                fill={liked ? "red" : "none"}
              />
            }
            count={likeCount}
            onIconPress={countLiked}
            onCountPress={handleLikePress}
          />
          <Reaction
            icon={<MessageCircle color="#555" />}
            count={3022}
            onIconPress={handleCommentPress}
            onCountPress={() => {}}
          />
        </View>
      </ScrollView>
      {/* Likes Modal */}
      <ModalPost
        visible={showLikes}
        onClose={() => setShowLikes(false)}
        title="Me gusta"
        data={likes}
        renderItem={({ item }) => (
          <View>
            <UserInfo
              user={{
                username: item.user, 
                avatar: item.avatar,
                time: item.time || "hace 1 hora", 
              }}
            />
          </View>
        )}
      />

      {/* Comments Modal */}
      <ModalPost
        visible={showComments}
        onClose={() => setShowComments(false)}
        title="Comentarios"
        data={comments}
        renderItem={({ item }) => (
          <View>
            <UserInfo
              user={{
                username: item.user, 
                avatar: item.avatar,
                time: item.time || "hace 1 hora", 
              }}
            />
            <Text style={styles.commentsContent}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 450,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    resizeMode: "cover",
  },
  postBody: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#111",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  commentsContent: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
