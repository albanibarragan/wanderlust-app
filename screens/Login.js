import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import Input from "../components/Input";
import TextLink from "../components/TextLink";
import API from "../assets/services/api";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const logo = require("../assets/brujula-logo.png");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      console.log("Login exitoso:", user);

      navigation.navigate("Main");
    } catch (err) {
      const msg = err?.response?.data?.msg || "Error al iniciar sesión";
      Alert.alert("Error", msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
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
                onPress={() => navigation.navigate("Recover")}
                textAlign="right"
              />

              <Button
                title={loading ? "Cargando..." : "Iniciar sesión"}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>

            <View style={styles.footer}>
              <TextLink
                style={styles.footerText}
                onPress={() => navigation.navigate("Register")}
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
