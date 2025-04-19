import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";
import CardProfile from "../components/CardProfile";
import { useState } from "react";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("posts");
  const route = useRoute();
  const { userId, isMyProfile } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <BackButton title={isMyProfile ? "Tu perfil" : "Perfil"} />
      <CardProfile
        avatar={user.avatar}
        name={user.name}
        username={user.username}
        bio={user.bio}
        stats={user.stats}
        showTabs={isMyProfile}
        showBio={isMyProfile}  
      />
      <View style={styles.content}>
    <FlatList
      data={postsUser}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
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
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});
