"use client";

import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { Calendar } from "react-native-feather";

const DateInput = ({
  label,
  value,
  onChangeDate,
  placeholder = "DD/MM/AAAA",
}) => {
  const [showNativePicker, setShowNativePicker] = useState(false);

  const handlePress = () => {
    if (Platform.OS === "web") {
      // En web, hacemos clic en el input de tipo date oculto
      document.getElementById("date-input").click();
    } else {
      // En móvil, mostramos el selector nativo
      setShowNativePicker(true);
    }
  };

  const handleWebDateChange = (e) => {
    if (e.target.value) {
      // Convertir formato YYYY-MM-DD a DD/MM/YYYY
      const dateObj = new Date(e.target.value);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      onChangeDate(formattedDate);
    }
  };

  const handleAndroidDateChange = (dateString) => {
    setShowNativePicker(false);
    if (dateString) {
      onChangeDate(dateString);
    }
  };

  // Componente específico para Android
  const AndroidDatePicker = () => {
    if (!showNativePicker) return null;

    // Implementación simple para Android que usa un input de texto
    // En una app real, usarías DatePickerAndroid o una biblioteca compatible
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={showNativePicker}
        onRequestClose={() => setShowNativePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una fecha</Text>

            <View style={styles.datePickerContainer}>
              {/* En una implementación real, aquí iría un DatePicker nativo */}
              {/* Esta es una versión simplificada para el ejemplo */}
              <TextInput
                style={styles.datePickerInput}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
                autoFocus={true}
                onChangeText={(text) => {
                  // Formatear automáticamente como DD/MM/AAAA mientras se escribe
                  let formatted = text;
                  if (text.length === 2 || text.length === 5) {
                    formatted = text + "/";
                  }
                  return formatted;
                }}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowNativePicker(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => handleAndroidDateChange("30/10/1998")} // Valor de ejemplo
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          editable={false}
        />
        <View style={styles.iconContainer}>
          <Calendar width={24} height={24} stroke="#999" />
        </View>
      </TouchableOpacity>

      {/* Input oculto para web */}
      {Platform.OS === "web" && (
        <input
          id="date-input"
          type="date"
          onChange={handleWebDateChange}
          style={{ display: "none" }}
        />
      )}

      {/* Picker para Android */}
      {Platform.OS === "android" && <AndroidDatePicker />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
  // Estilos para el modal de Android
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  datePickerContainer: {
    width: "100%",
    marginVertical: 15,
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f2f2f2",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontSize: 16,
  },
  confirmButtonText: {
    color: "white",
  },
});

export default DateInput;
