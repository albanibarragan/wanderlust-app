import { View, Text, Image, StyleSheet } from "react-native";
import StatsProfile from "./StatsProfile";
import ProfileTabs from "./ProfileTabs";

export default function CardProfile({
  avatar,
  name,
  username,
  bio,
  showStats = false,
  showTabs = false,
  showSettings = false,
}) {
  return (
    <View style={styles.container}>
      {/* Perfil básico */}
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.containerUser}>
        <Text style={styles.name}>{name.trim()}</Text>
        <Text style={styles.username}>@{username.trim()}</Text>

        {/* Biografía */}
        {bio?.trim() !== "" && (
          <Text style={styles.bio}>{bio.trim()}</Text>
        )}
      </View>

      {/* Sección de contenido extra */}
      <View style={styles.extraContent}>
        {showStats && <StatsProfile />}
        {showTabs && <ProfileTabs />}
        {showSettings && (
          <View style={styles.section}>
            <Text style={styles.settings}>Settings</Text>
          </View>
        )}
        {follow && (
           <TouchableOpacity style={styles.followButton}>
           <Text style={styles.buttonText}>Seguir</Text>
         </TouchableOpacity>
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
});