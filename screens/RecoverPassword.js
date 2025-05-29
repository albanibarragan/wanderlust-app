"use client";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Modal from "../components/Modal";
import { getCurrentUserId } from "../assets/api/auth";
import { restorePassword } from "../assets/api/UserService";

const RecoverPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const logo = require("../assets/brujula-logo.png");
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log("Volver atrás");
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  // Validación de contraseña
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*[.,\/\*\$\#])[A-Za-z\d.,\/\*\$\#]{5,8}$/;
    if (!pwd) return "La contraseña no puede estar vacía";
    if (!regex.test(pwd))
      return "Debe tener 5-8 caracteres, una mayúscula y un carácter especial (.,/*$#)";
    return "";
  };


const handleRecover = async () => {
  const pwdError = validatePassword(password);
  const confirmPwdError = !confirmPassword
    ? "La confirmación no puede estar vacía"
    : password !== confirmPassword
    ? "Las contraseñas no coinciden"
    : validatePassword(confirmPassword);

  setPasswordError(pwdError);
  setConfirmPasswordError(confirmPwdError);

  if (!pwdError && !confirmPwdError) {
    try {
      const userId = await getCurrentUserId();
      const res = await restorePassword(userId, password);
      console.log("✅ Contraseña actualizada:", res.msg);
      setModalVisible(true);
    } catch (err) {
      console.error("❌ Error al cambiar contraseña:", err);
      alert("Ocurrió un error al cambiar tu contraseña.");
    }
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <BackButton onPress={handleBack} />
            </View>
            <Image source={logo} style={{ width: 100, height: 100 }} />

            <Text style={styles.title}>Cambio de Contraseña</Text>
            <Text style={styles.subtitle}>
              Mantén tu cuenta segura creando una contraseña fuerte
            </Text>

            <View style={styles.form}>
              <Input
                label="Contraseña"
                placeholder="********"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                secureTextEntry={true}
                style={[
                  passwordError ? { borderColor: "red", borderWidth: 1 } : {},
                ]}
              />
              {passwordError ? (
                <Text style={{ color: "red", marginBottom: 8 }}>
                  {passwordError}
                </Text>
              ) : null}

              <Input
                label="Confirmar Contraseña"
                placeholder="********"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (confirmPasswordError) setConfirmPasswordError("");
                }}
                secureTextEntry={true}
                style={[
                  confirmPasswordError
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
              />
              {confirmPasswordError ? (
                <Text style={{ color: "red", marginBottom: 8 }}>
                  {confirmPasswordError}
                </Text>
              ) : null}

              <Text style={styles.subtitle}>
                Tu contraseña debe contener al menos una letra mayúscula
              </Text>

              <Button title="Crear nueva contraseña" onPress={handleRecover} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Contraseña cambiada"
        message="Has cambiado tu contraseña correctamente"
        buttonText="Continuar"
        onButtonPress={handleContinue}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
    paddingTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 24,
    color: "#000000",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginTop: 8,
    marginBottom: 32,
    textAlign: "left",
  },
  form: {
    width: "100%",
    maxWidth: 350,
  },
});

export default RecoverPassword;
