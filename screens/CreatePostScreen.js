import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Image, ActivityIndicator, ScrollView} from "react-native";
import { useState } from "react";
import { Smile, Camera, Compass, ImageIcon } from "lucide-react-native";

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");
  const avatarUrl = 'https://i.pravatar.cc/100?img=2';

  const [isPublishing, setIsPublishing] = useState(false);
  const username = "Albani Barragan";

  const handlePublish =() =>{
    setIsPublishing(true);
    setTimeout(() =>{
      setIsPublishing(false);
      navigation.navigate("Home");
   }, 2000)
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <SafeAreaView style={styles.container}>
      <BackButton title="Nuevo Post" />
      <View style={styles.header}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      </View>
        <TextInput
          style={styles.textInput}
          placeholder="¿Tienes una experiencia que quieras compartir?"
          multiline
          numberOfLines={10}
          value={text}
          onChangeText={setText}
        />

      <View style={styles.menuAction}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <ImageIcon size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}activeOpacity={0.7}>
          <Compass size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}activeOpacity={0.7}>
          <Camera size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}activeOpacity={0.7}>
          <Smile size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish} activeOpacity={0.7}>
        {isPublishing ? (
    <ActivityIndicator color="#000" />
   ):(
    <Text style={styles.publishText}>Publicar</Text>
   )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  post: {
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,

  },
  header:{
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  username:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textInput: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
    margin: 16,
    marginTop: 2,
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
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    marginHorizontal: 4,
  },
  publishButton: {
    backgroundColor: "#4a63f2",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  },
  publishText: {
    color: "#fff",
    fontWeight: "bold", 
    fontSize: 16,
  },
});
