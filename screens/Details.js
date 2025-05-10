import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";

import BackButton from "../components/BackButton";
import UserHeader from "../components/UserHeader";
import Reaction from "../components/Reaction";
import ModalPost from "../components/ModalPost";
import { users, likes, comments, currentUser } from "../assets/data/Mocks";
import ModalDelete from "../components/ModalDelete";

export default function Details({ route }) {
  const { post, user: passedUser } = route.params;
  const navigation = useNavigation();

  const user =
    passedUser ||
    (post.userId === currentUser.id
      ? currentUser
      : users.find((u) => u.id === post.userId)) ||
    null;

  const isOwner = post.userId === currentUser.id;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBack = () => navigation.goBack();

  const handleDeletePost = () => {
    console.log("Publicación eliminada:", post.id);
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => (newLiked ? count + 1 : count - 1));
      return newLiked;
    });
  };

  const openComments = () => {
    setShowComments(false);
    setTimeout(() => setShowComments(true), 10);
  };

  const getUserById = (userId) => {
    if (userId === currentUser.id) return currentUser;
    return users.find((u) => u.id === userId) || null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={handleBack} title="Post" />
        <Image source={{ uri: post.image }} style={styles.image} />

        <UserHeader user={user} time={post.time} />

        <View style={styles.postBody}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.description}>{post.content}</Text>
          {isOwner && (
            <View style={styles.ownerActions}>
              <TouchableOpacity onPress={() => console.log("Editar post", post.id)}>
                <Text style={styles.ownerActionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <Text style={styles.ownerActionText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.reactions}>
          <Reaction
            icon={
              <Icon
                name="heart"
                size={22}
                color={liked ? "red" : "#888"}
                solid={liked}
              />
            }
            count={likeCount}
            onIconPress={toggleLike}
            onCountPress={() => setShowLikes(true)}
          />
          <Reaction
            icon={<Icon name="message-circle" size={22} color="#888" />}
            count={comments.length}
            onIconPress={openComments}
            onCountPress={() => {}}
          />
        </View>
      </ScrollView>

      <ModalPost
        visible={showLikes}
        onClose={() => setShowLikes(false)}
        title="Me gusta"
        data={likes}
        renderItem={({ item }) => {
          const likeUser = getUserById(item.userId);
          return (
            <View style={styles.commentItem}>
              <UserHeader user={likeUser} onCloseModal={() => setShowLikes(false)} />
            </View>
          );
        }}
      />

      <ModalPost
        visible={showComments}
        onClose={() => setShowComments(false)}
        title="Comentarios"
        data={comments}
        isComment={true}
        renderItem={({ item }) => {
          const commentUser = getUserById(item.userId);
          return (
            <View style={styles.commentItem}>
              <UserHeader user={commentUser} time={item.time} onCloseModal={() => setShowComments(false)} />
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          );
        }}
      />

      {showDeleteModal && (
        <ModalDelete
          onCancel={handleCancelDelete}
          onDelete={handleDeletePost}
        />
      )}
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
  commentItem: {
    marginBottom: 12,
  },
  commentText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  ownerActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  ownerActionText: {
    fontSize: 16,
    color: "#0099ff",
    fontWeight: "bold",
  },
});
