import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function CameraPicker({ mediaFiles, setMediaFiles }) {
  const MAX_FILES = 5;

  const openCamera = async () => {
    if (mediaFiles.length >= MAX_FILES) {
      Alert.alert(
        "Límite alcanzado",
        `Solo puedes subir un máximo de ${MAX_FILES} archivos.`
      );
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesita permiso para usar la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newPhoto = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType || "image/jpeg",
      };

      setMediaFiles((prev) => [...prev, newPhoto]);
    }
  };

  return (
    <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
      <Ionicons name="camera-outline" size={24} color="#000" />
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
