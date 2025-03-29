import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardPost({ item }) {
  const { username, avatar, image, time, content } = item;

  return (
    <SafeAreaView>
      <View style={styles.card}>
        {/* Header del Post */}
        <View style={styles.header}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
        </View>

        {/* Imagen principal del post */}
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.mainImage}
          />
        )}

        {/* Acciones */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Meta información */}
        <View style={styles.meta}>
          <View style={styles.metaHeader}>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.rightMeta}>
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>
          {content ? (
            <Text style={styles.content}>{content}</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  actionBtn: {
    marginRight: 16,
  },
  meta: {
    padding: 10,
  },
  metaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
  content: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
});
