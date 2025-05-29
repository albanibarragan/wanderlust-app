import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardProfile from "../components/CardProfile";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import PhotoCard from "../components/PhotoCard";
import { useEffect, useState } from "react";
import { getCurrentUserId } from "../assets/api/auth";
import { getPostsByUserId } from "../assets/api/PostService";
import { getUserById } from "../assets/api/UserService";

const windowWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const route = useRoute();
  const { userId: paramUserId, isMyProfile = false } = route.params || {};
  const [postsUser, setPostsUser] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let idToFetch = paramUserId;
        console.log("🔍 ID del usuario desde params:", idToFetch);

        if (isMyProfile) {
          idToFetch = await getCurrentUserId();
        }

        if (!idToFetch) {
          throw new Error("No se pudo obtener el ID del usuario.");
        }

        console.log("🔍 ID a buscar:", idToFetch);

        const userData = await getUserById(idToFetch);
        setUser(userData);

        const posts = await getPostsByUserId(idToFetch);
        console.log("🔍 Posts recibidos en ProfileScreen:", posts);
        setPostsUser(posts);
      } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isMyProfile, paramUserId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Usuario no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title={isMyProfile ? "Tu perfil" : "Perfil"} />

      <CardProfile
        avatar={user.profilePicture}
        name={`${user.firstName} ${user.lastName}`}
        username={user.username}
        bio={user.bio}
        stats={{ posts: postsUser.length, followers: 0, following: 0 }}
        isMyProfile={isMyProfile}
      />

      <View style={styles.content}>
        <FlatList
          data={postsUser}
          keyExtractor={(item) => item.post?._id}
          numColumns={2}
          renderItem={({ item }) => {
            const post = item.post;
            const image = item.media?.[0]?.url || null;

            return (
              <PhotoCard
                post={{
                  ...post,
                  image,
                  user: {
                    username: post.userId?.username,
                    profilePicture: null,
                  },
                }}
                cardWidth={windowWidth / 2 - 24}
              />
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {isMyProfile
                  ? "¡Aún no has publicado nada!"
                  : "Este usuario no tiene publicaciones."}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  postImage: {
    width: "48%",
    aspectRatio: 1,
    margin: 4,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
