import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeUsernameForm({ onCancel, onChange}) {
  const [newUsername, setNewUsername] = useState("");

  const handleUpdateUsername = () => {
    if (newUsername.trim() !== "") {
      onChange(newUsername); 
      onCancel();             
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cambiar nombre de usuario</Text>
      <Input
        placeholder="Nuevo nombre de usuario"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUsername}>
        <Text style={styles.updateButtonText}>Cambiar nombre de usuario</Text>
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