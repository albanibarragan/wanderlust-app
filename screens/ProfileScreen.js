import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";
import CardProfile from "../components/CardProfile";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import { currentUser, users, posts } from "../assets/data/Mocks";
import PhotoCard from "../components/PhotoCard";

const windowWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const route = useRoute();
  const params = route?.params || {};
  const { userId, isMyProfile = false } = route.params || {};

  const user = isMyProfile ? currentUser : users.find((u) => u.id === userId);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Usuario no encontrado</Text>
      </SafeAreaView>
    );
  }
  const postsUser = posts.filter((post) => post.userId === user.id);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title={isMyProfile ? "Tu perfil" : "Perfil"} />

      <CardProfile
        avatar={user.avatar}
        name={user.name}
        username={user.username}
        bio={user.bio}
        stats={user.stats || { posts: 0, followers: 0, following: 0 }}
        isMyProfile={isMyProfile}
      />

      <View style={styles.content}>
        <FlatList
          data={postsUser}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PhotoCard post={item} cardWidth={windowWidth / 2 - 24} />
          )}
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
