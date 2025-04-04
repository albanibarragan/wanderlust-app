import React from "react";
import { ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import CommentsScreen from './CommentsScreen';
import BottomSheet from "@gorhom/bottom-sheet";

export default function Details({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const handlePressComment = () => {
    bottomSheetRef.current?.expand(); 
  };

  const handleBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton onPress={handleBack} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagen */}
        <Image source={{ uri: post.image }} style={styles.image} />

        {/* Usuario + tiempo */}
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.location}>{post.location}</Text>
          </View>
          <Text style={styles.timeAgo}>{post.time}</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>“{post.title}”</Text>

        {/* Contenido */}
        <Text style={styles.content}>{post.fullContent}</Text>

        {/* Hashtags */}
        <Text style={styles.hashtags}>
          #Recife #Brasil #ArteUrbano #Viajes #Wanderlust #Aventura
        </Text>

        {/* Reacciones */}
        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <Text style={styles.icon}>❤️</Text>
            <Text style={styles.count}>3,022</Text>
          </View>
            <TouchableOpacity style={styles.reactionItem} onPress={handlePressComment}>
            <Text style={styles.icon}>💬</Text>
            <Text style={styles.count}>242</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <CommentsScreen post={post} />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 450,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  location: {
    color: "gray",
    fontSize: 13,
  },
  timeAgo: {
    marginLeft: "auto",
    fontSize: 12,
    color: "gray",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    color: "#333",
  },
  hashtags: {
    color: "#8b5cf6", // violeta
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 30,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  count: {
    marginLeft: 6,
    fontSize: 14,
  },
});
