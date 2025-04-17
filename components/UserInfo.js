import { StyleSheet, View, Text, Image } from "react-native";

export default function UserInfo({ user }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.userDetails}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.location}>{user.location}</Text>
      </View>
      <Text style={styles.timeAgo}>{user.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  userDetails: {
    flexShrink: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },
  location: {
    color: "gray",
    fontSize: 13,
  },
  timeAgo: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
});