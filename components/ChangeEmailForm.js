import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeEmailForm({ onCancel, onChange }) {
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = () => {
    if (newEmail.trim() !== "") {
      onChange(newEmail); 
      onCancel(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cambiar correo electrónico</Text>
      <Input
        placeholder="Nuevo correo electrónico"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address" // Opcional: teclado de email
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEmail}>
        <Text style={styles.updateButtonText}>Cambiar correo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#0099ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
