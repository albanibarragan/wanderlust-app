import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import StatsProfile from "./StatsProfile";
import ProfileTabs from "./ProfileTabs";
import Button from "./Button";

export default function CardProfile({
  avatar,
  name,
  username,
  bio,
  stats = { posts: 0, followers: 0, following: 0 },
  showSettings = false,
  isMyProfile = true,
}) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.containerUser}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>
      {isMyProfile || (
        <View style={styles.followButton}>
          <Button title={"Seguir"} />
        </View>
      )}
      <View style={styles.extraContent}>
        <StatsProfile
          posts={stats.posts}
          followers={stats.followers}
          following={stats.following}
        />

        {isMyProfile && !showSettings && <ProfileTabs  />}
        {showSettings && (
          <View style={styles.section}>
            <Text style={styles.settings}>Ajustes</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  containerUser: {
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  username: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  bio: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 24,
    lineHeight: 18,
  },
  extraContent: {
    width: "100%",
    marginTop: 12,
  },
  section: {
    marginTop: 16,
    alignItems: "center",
  },
  settings: {
    fontSize: 14,
    color: "#007aff",
  },
  followButton: {
    alignSelf: "center",
    marginTop: 8,
    width: 150,
    height: 40,
    justifyContent: "center",
  },
});
