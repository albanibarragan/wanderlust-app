import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import CameraPicker from "../components/CameraPicker";
import MediaPicker from "../components/MediaPicker";
import MediaPreview from "../components/MediaPreview";
import { createPost } from "../assets/api/PostService";

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handlePost = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      Alert.alert("Campo obligatorio", "Por favor, escribe un título para tu publicación.");
      return;
    }

    if (!trimmedContent) {
      Alert.alert("Campo obligatorio", "Por favor, escribe algo sobre tu experiencia.");
      return;
    }

    if (mediaFiles.length === 0) {
      Alert.alert("Imagen requerida", "Debes seleccionar al menos una imagen.");
      return;
    }

    setIsLoading(true);

    try {
      await createPost({
        title: trimmedTitle,
        description: trimmedContent,
        mediaFiles,
        tags,
        location: null, 
      });

      Alert.alert("Éxito", "Tu publicación ha sido creada");

      // Limpiar formulario
      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
      setMediaFiles([]);

      navigation.goBack();
    } catch (err) {
      console.error("Error al crear la publicación:", err);
      const msg =
        err?.response?.data?.msg || err.message || "Error al crear la publicación.";
      Alert.alert("Error", msg);
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <BackButton title="Nuevo Post" />

        <TextInput
          style={styles.titleInput}
          placeholder="Título de la publicación"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Escribe sobre tu viaje..."
          value={content}
          onChangeText={(text) => {
            if (text.length <= 500) setContent(text);
          }}
          multiline
          placeholderTextColor="#999"
        />
        <Text style={styles.charCount}>{content.length}/500</Text>

        <View style={styles.tagSection}>
          <View style={styles.tagInputRow}>
            <TextInput
              style={styles.tagInput}
              placeholder="Escribe una etiqueta"
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={() => {
                if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                  setTags((prev) => [...prev, tagInput.trim()]);
                }
                setTagInput("");
              }}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={() => {
                if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                  setTags((prev) => [...prev, tagInput.trim()]);
                }
                setTagInput("");
              }}
              style={styles.addTagButton}
            >
              <AntDesign name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagList}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setTags(tags.filter((t) => t !== tag));
                  }}
                >
                  <AntDesign name="close" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <MediaPreview mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />

        {mediaFiles.length === 0 && (
          <Text style={styles.warningText}>
            Debes seleccionar al menos una imagen.
          </Text>
        )}

        <View style={styles.actionsRow}>
          <MediaPicker mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
          <CameraPicker mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
          <TouchableOpacity style={styles.iconButton}>
            <Entypo name="location-pin" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="emoji-emotions" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.postButton,
            (isLoading || !content.trim() || mediaFiles.length === 0 || !title.trim()) &&
              styles.disabledButton,
          ]}
          onPress={handlePost}
          disabled={isLoading || !content.trim() || mediaFiles.length === 0 || !title.trim()}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? "Publicando..." : "Publicar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  addTitleButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addTitleText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    textAlignVertical: "top",
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    backgroundColor: "#ff5a3d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#ffaa99",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
    color: "#333",
  },
});

export default CreatePostScreen;
