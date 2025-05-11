import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export default function MediaPicker({ mediaFiles, setMediaFiles }) {
  const MAX_FILES = 5;

  const pickFromGallery = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "video/*"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const currentCount = mediaFiles.length;
        const newCount = result.assets.length;

        if (currentCount + newCount > MAX_FILES) {
          Alert.alert(
            "Límite alcanzado",
            `Solo puedes subir un máximo de ${MAX_FILES} archivos.`
          );
          return;
        }

        const newMedia = result.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.mimeType,
        }));

        setMediaFiles((prev) => [...prev, ...newMedia]);
      }
    } catch (error) {
      console.log("Error al abrir galería:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.iconButton} onPress={pickFromGallery}>
      <Ionicons name="images-outline" size={24} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
