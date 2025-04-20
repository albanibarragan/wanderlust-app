import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "./Modal";

export default function ChangePasswordForm({ onCancel, onChange }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdatePassword = () => {
    setModalVisible(true);
  };
  
  const handleModalClose = () => {
    setModalVisible(false);
    onChange && onChange(); 
    onCancel(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Input
        placeholder="Contraseña actual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true}
      />
      <Input
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <Input
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.updateButtonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Contraseña cambiada"
        message="Has cambiado tu contraseña correctamente"
        buttonText="Continuar"
        onButtonPress={handleModalClose}
      />
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
