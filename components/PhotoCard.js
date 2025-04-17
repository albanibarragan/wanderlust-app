import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default function PhotoCard({ post }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <Text style={styles.textUser}> {post.username}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{post.time}</Text>
      </View>
      <Image
        source={{ uri: post.image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: "#eee"
  },
});
