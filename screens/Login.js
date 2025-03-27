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
import { useFonts } from "expo-font";
import Input from "../components/Input";
import Button from "../components/Button";
import TextLink from "../components/TextLink";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const logo = require("../assets/brujula-logo.png");

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    alert("funcion para iniciar sesion");
  };

  const recoverPass = () => {
    navigation.navigate("Recover");
    //console.log("Navegar a recuperar contraseña");
  };

  const registerUser = () => {
    navigation.navigate("Register");
    //console.log("Navegar a registro");
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
    flexDirection: "row", // Asegura que los elementos estén en fila
    marginTop: 24,
    alignItems: "center", // Alinea verticalmente los elementos
    justifyContent: "center", // Centra los elementos horizontalmente
    fontWeight: "bold",
  },
  registerLink: {
    fontSize: 12, // Ajusta el tamaño del texto si es necesario
    color: "#0FA3E2", // Color del enlace (ajústalo según tu tema)
    fontWeight: "bold", // Opcional: texto en negrita
  },
});

export default Login;
