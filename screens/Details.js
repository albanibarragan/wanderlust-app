import { useState, useEffect } from "react";
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
import { getCommentsByPostId } from "../assets/api/comments";
import { getCurrentUserId } from "../assets/api/auth";

export default function Details({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();

  const user = post.user || post.userId || { username: "usuario", avatar: null };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

useEffect(() => {
  const fetchCurrentUser = async () => {
    const userId = await getCurrentUserId();
    setCurrentUserId(userId);
  };

  fetchCurrentUser();
}, []);

  const isOwner = post.userId?._id === currentUserId || post.userId === currentUserId;

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

  const handleDeletePost = async () => {
  try {
    await deletePostById(post._id);
    console.log("Publicación eliminada:", post._id);
    setShowDeleteModal(false);
    navigation.goBack();
  } catch (error) {
    setShowDeleteModal(false);
    alert("Error al eliminar el post");
  }
};

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByPostId(post._id);
      setComments(fetchedComments);
    };
    fetchComments();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BackButton onPress={handleBack} title="Publicación" />
        <Image source={{ uri: post.image }} style={styles.image} />

        <UserHeader
          user={user}
          time={new Date(post.createdAt).toLocaleDateString("es-ES")}
        />

        <View style={styles.postBody}>
          <Text style={styles.title}>“{post.title}”</Text>

          {isOwner && (
            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setShowOptions((prev) => !prev)}
                style={{ padding: 8, borderRadius: 20 }}
                activeOpacity={0.6}
              >
                <Icon name="more-vertical" size={28} color="#888" />
              </TouchableOpacity>
              {showOptions && (
                <View style={styles.optionsMenu}>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => console.log("Editar", post._id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => setShowDeleteModal(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.deleteText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
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
          />
        </View>
      </ScrollView>

      <ModalPost
        visible={showLikes}
        onClose={() => setShowLikes(false)}
        title="Me gusta"
        data={post.likes || []}
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
              user={item.userId || { username: "usuario" }}
              time={new Date(item.createdAt).toLocaleDateString("es-ES")}
              onCloseModal={() => setShowComments(false)}
            />
            <Text style={styles.commentText}>{item.content}</Text>
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
  optionsMenu: {
    position: 'absolute',
    top: 38,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});