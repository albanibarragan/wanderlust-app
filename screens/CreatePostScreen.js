import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { TextInput, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import { useState } from "react";
import { Image, Smile, Camera, Compass } from "lucide-react-native";

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");
  const avatarUrl = 'https://i.pravatar.cc/100?img=2';

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title="Nuevo Post" />
      <View style={styles.post}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <TextInput
          style={styles.textInput}
          placeholder="¿Tienes una experiencia que quieras compartir?"
          multiline
          numberOfLines={4}
          value={text}
          onChangeText={setText}
        />
      </View>
      <View style={styles.menuAction}>
        <TouchableOpacity style={styles.iconButton}>
          <Image size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Compass size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Camera size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Smile size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.publishText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  post: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    minHeight: 80,
    textAlignVertical: "top",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  menuAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#e0e0e0",
  },
  iconButton: {
    alignItems: "center",
    marginRight: 12,
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  publishButton: {
    backgroundColor: "#4a63f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: "auto",
  },
  publishText: {
    color: "#fff",
    fontWeight: "600",
  },
});
