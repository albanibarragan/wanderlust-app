import { useState } from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Heart, MessageCircle } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import UserHeader from "../components/UserHeader";
import Reaction from "../components/Reaction";
import ModalPost from "../components/ModalPost";
import { users, likes, comments } from "../assets/data/Mocks";


export default function Details({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();
  const user = users.find((u) => u.id === post.userId);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const handleBack = () => navigation.goBack();

  const toggleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <BackButton onPress={handleBack} title={"Post"} />
        <Image source={{ uri: post.image }} style={styles.image} />

        {/* Usuario Header */}
        <UserHeader
          user={{
            avatar: user?.avatar,
            username: user?.username,
            location: post.location,
            time: post.time,
          }}
        />

        {/* Post contenido */}
        <View style={styles.postBody}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.description}>{post.content}</Text>
        </View>

        {/* Reacciones */}
        <View style={styles.reactions}>
          <Reaction
            icon={
              <Heart
                color={liked ? "red" : "#888"}
                fill={liked ? "red" : "none"}
              />
            }
            count={likeCount}
            onIconPress={toggleLike}
            onCountPress={() => setShowLikes(true)}
          />
          <Reaction
            icon={<MessageCircle color="#888" />}
            count={comments.length}
            onIconPress={() => setShowComments(true)}
            onCountPress={() => {}}
          />
        </View>
      </ScrollView>

      {/* Modal Me gusta */}
      <ModalPost
        visible={showLikes}
        onClose={() => setShowLikes(false)}
        title="Me gusta"
        data={likes}
        renderItem={({ item }) => (
          <UserHeader
            user={{
              username: item.user,
              avatar: item.avatar,
              time: item.time || "hace 1 hora",
            }}
          />
        )}
      />

      {/* Modal Comentarios */}
      <ModalPost
        visible={showComments}
        onClose={() => setShowComments(false)}
        title="Comentarios"
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <UserHeader
              user={{
                username: item.user,
                avatar: item.avatar,
                time: item.time || "hace 1 hora",
              }}
            />
            <Text style={styles.commentText}>{item.text}</Text>
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