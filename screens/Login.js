"use client";

import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import TextLink from "../components/TextLink";
import Modal from "../components/Modal";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const logo = require("../assets/brujula-logo.png");

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const handleBackPress = () => {
    setShowExitModal(true);
    return true;
  };

  const handleExitApp = () => {
    setShowExitModal(false);
    BackHandler.exitApp();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    navigation.replace("Main");
  };

  const recoverPass = () => {
    navigation.navigate("Recover");
  };

  const registerUser = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Image source={logo} style={{ width: 100, height: 100 }} />

            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
              Ingresa tus datos para iniciar sesión
            </Text>

            <View style={styles.form}>
              <Input
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />

              <TextLink
                text="¿Olvidaste tu contraseña?"
                onPress={recoverPass}
                textAlign="right"
              />

              <Button
                title="Iniciar sesión"
                onPress={handleLogin}
                disabled={loading}
              />
            </View>

            <View style={styles.footer}>
              <TextLink
                style={styles.footerText}
                onPress={registerUser}
                text="¿No tienes una cuenta? Crea una aquí"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Salir de la aplicación"
        message="¿Estás seguro que deseas salir de la aplicación?"
        buttonText="Sí, salir"
        onButtonPress={handleExitApp}
        showSecondaryButton={true}
        secondaryButtonText="Cancelar"
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
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "Roboto-Bold",
    marginTop: 24,
    color: "#000000",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#666666",
    marginTop: 8,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    maxWidth: 350,
  },
  footer: {
    flexDirection: "row", 
    marginTop: 24,
    alignItems: "center", 
    justifyContent: "center", 
    fontWeight: "bold",
  },
  registerLink: {
    fontSize: 12,
    color: "#0FA3E2", 
    fontWeight: "bold", 
  },
});

export default Login;
