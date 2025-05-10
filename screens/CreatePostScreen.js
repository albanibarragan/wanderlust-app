import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Smile, Camera, Compass, ImageIcon } from "lucide-react-native";
import HeaderCreatePost from "../components/HeaderCreatePost";
import Modal from "../components/Modal";
import { useNavigation } from "@react-navigation/native";

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsModalVisible(true);
    }, 2000);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <BackButton title="Nueva Publicación" />
        <HeaderCreatePost text={text} setText={setText} />

        <View style={styles.menuAction}>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <ImageIcon size={23} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Compass size={23} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Camera size={23} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Smile size={23} color="#555" />
            </TouchableOpacity>
          </View>
          {isPublishing ? (
            <ActivityIndicator color="#000" />
          ) : (
            <TouchableOpacity
              style={styles.publishButton}
              onPress={handlePublish}
              activeOpacity={0.7}
            >
              <Text style={styles.publishText}>Publicar</Text>
            </TouchableOpacity>
          )}

          <Modal
            visible={isModalVisible}
            title="¡Publicado!"
            message="Tu post ha sido compartido"
            buttonText="Ir al inicio"
            onButtonPress={() => {
              setIsModalVisible(false);
              navigation.navigate("Home");
            }}
            onClose={() => setIsModalVisible(false)}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  username: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#111",
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    textAlignVertical: "top",
    minHeight: 120,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
  },
  publishButton: {
    backgroundColor: "#FF6B4A",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  publishText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
