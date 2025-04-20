import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeNameForm({ onCancel, onChange }) {
  const [newName, setNewName] = useState("");

  const handleUpdateName = () => {
    if (newName.trim() !== "") {
      onChange(newName); 
      onCancel(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cambiar nombre</Text>
      <Input
        placeholder="Nuevo nombre"
        value={newName}
        onChangeText={setNewName}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateName}>
        <Text style={styles.updateButtonText}>Cambiar nombre</Text>
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
