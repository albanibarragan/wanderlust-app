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
  Alert
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import CameraPicker from "../components/CameraPicker";
import MediaPicker from "../components/MediaPicker";
import MediaPreview from "../components/MediaPreview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URLL } from '@env';

const CreatePostScreen = ({ navigation }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Por favor, escribe algo sobre tu experiencia.");
      return;
    }

    setIsLoading(true);

    try {
      const wanderlust_token = await AsyncStorage.getItem('token');
      if (!wanderlust_token) {
        Alert.alert("Error", "No has iniciado sesión");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', content);
      
      // Agregar imagen si existe
      if (mediaFiles.length > 0) {
        const imageUri = mediaFiles[0].uri;
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';
        
        formData.append('image', {
          uri: imageUri,
          name: filename,
          type
        });
      }
      
      // Usar la URL de la variable de entorno correctamente
      const apiUrl = API_URLL || 'http://192.168.20.119:8080/api';
      const response = await axios.post(
        `${apiUrl}/post`,
        formData,
        {
          headers: { 
            wanderlust_token, 
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log("Respuesta del servidor:", response.data);
      Alert.alert("Éxito", "Tu publicación ha sido creada");
      
      // Limpiar el formulario
      setTitle("");
      setContent("");
      setShowTitle(false);
      setMediaFiles([]);
      
      // Navegar de vuelta a la pantalla principal o feed
      navigation.goBack();
    } catch (err) {
      console.error("Error al crear la publicación:", err);
      const msg = err?.response?.data?.msg || "Error al crear la publicación. Intenta de nuevo.";
      Alert.alert("Error", msg);
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
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

        <TouchableOpacity 
          style={[styles.postButton, isLoading && styles.disabledButton]} 
          onPress={handlePost}
          disabled={isLoading}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? "Publicando..." : "Publicar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

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
  }
});

export default CreatePostScreen;