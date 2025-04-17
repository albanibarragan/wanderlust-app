import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardPost({ item }) {
  const { username, avatar, image, time, content } = item;
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      {/* Imagen principal del post */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.mainImage} />

        {/* Encabezado: usuario y hora */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonUserInfo}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.textName}>{username}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contenido del post */}
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.postContent}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            <Text style={styles.postText} numberOfLines={4}>{content}</Text>
          </TouchableOpacity>

          {/* Acciones: Me gusta, comentarios, compartir */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.icon}>❤️</Text>
              <Text style={styles.count}>20</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.icon}>💬</Text>
              <Text style={styles.count}>100</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.icon}>✈️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
  buttonUserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textName: {
    color: "#fff",
    fontWeight: "bold",
  },
  time: {
    color: "#eee",
    fontSize: 12,
    marginLeft: "auto",
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 4,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 4 / 5,
    resizeMode: "cover",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  postContent: {
    flex: 1,
    paddingRight: 8,
  },
  postText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor:'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    fontSize: 18,
    color: '#fff',
    marginRight: 4,
  },
  count: {
    fontSize: 14,
    color: '#fff'
  }
});
