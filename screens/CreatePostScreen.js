import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import CameraPicker from "../components/CameraPicker";
import MediaPicker from "../components/MediaPicker";
import MediaPreview from "../components/MediaPreview";

export default function CreatePostScreen() {
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const handlePost = () => {
    if (!content.trim()) {
      alert("Por favor, escribe algo sobre tu experiencia.");
      return;
    }

    console.log("📍 Post:", {
      título: title || "(Sin título)",
      contenido: content,
      media: mediaFiles,
    });

    setTitle("");
    setContent("");
    setShowTitle(false);
    setMediaFiles([]);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton title="Nuevo Post" />


        {!showTitle && (
          <TouchableOpacity
            onPress={() => setShowTitle(true)}
            style={styles.addTitleButton}
          >
            <AntDesign name="pluscircleo" size={20} color="#555" />
            <Text style={styles.addTitleText}>Agregar título</Text>
          </TouchableOpacity>
        )}
        
        {showTitle && (
          <TextInput
            style={styles.titleInput}
            placeholder="Título (opcional)"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#aaa"
          />
        )}

        <TextInput
          style={styles.contentInput}
          placeholder="Escribe sobre tu viaje..."
          value={content}
          onChangeText={setContent}
          multiline
          placeholderTextColor="#999"
        />

        <MediaPreview mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />

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

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
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
});
