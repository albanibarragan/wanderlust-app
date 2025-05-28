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
import Icon from "react-native-vector-icons/Feather";

import BackButton from "../components/BackButton";
import UserHeader from "../components/UserHeader";
import Reaction from "../components/Reaction";
import ModalPost from "../components/ModalPost";
import ModalDelete from "../components/ModalDelete";

import { comments, currentUser, likes } from "../assets/data/Mocks";

export default function Details({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();

  const user = post.user || { username: "usuario", avatar: null };

  const isOwner = user.username === currentUser.username;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBack = () => navigation.goBack();

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

  const handleDeletePost = () => {
    console.log("Publicación eliminada:", post._id);
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={handleBack} title="Publicación" />

        <Image source={{ uri: post.image }} style={styles.image} />

        {/* ✅ User + Fecha */}
        <UserHeader
          user={user}
          time={new Date(post.createdAt).toLocaleDateString("es-ES")}
        />

        {/* ✅ Contenido */}
        <View style={styles.postBody}>
          <Text style={styles.title}>“{post.title}”</Text>
          <Text style={styles.description}>{post.content}</Text>

          {isOwner && (
            <View style={styles.ownerActions}>
              <TouchableOpacity onPress={() => console.log("Editar", post._id)}>
                <Text style={styles.ownerActionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <Text style={styles.ownerActionText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ✅ Reacciones */}
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
          />
        </View>
      </ScrollView>

      <ModalPost
        visible={showLikes}
        onClose={() => setShowLikes(false)}
        title="Me gusta"
        data={likes}
        renderItem={({ item }) => (
          <UserHeader
            user={item}
            onCloseModal={() => setShowLikes(false)}
          />
        )}
      />

      <ModalPost
        visible={showComments}
        onClose={() => setShowComments(false)}
        title="Comentarios"
        data={comments}
        isComment
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <UserHeader
              user={item.user}
              time={item.time}
              onCloseModal={() => setShowComments(false)}
            />
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
        )}
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
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  userContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  postBody: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  ownerActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#EAF4FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  deleteButton: {
    backgroundColor: "#FFECEC",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editText: {
    color: "#0077cc",
    fontWeight: "600",
  },
  deleteText: {
    color: "#cc0000",
    fontWeight: "600",
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
});
