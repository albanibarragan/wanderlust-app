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

const Recover = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const logo = require("../assets/brujula-logo.png");

  const handleRecover = async () => {
    navigation.navigate("RecoverPassword");
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
              <BackButton />
            </View>
            <Image source={logo} style={{ width: 100, height: 100 }} />

            <Text style={styles.title}>Cambio de Contraseña</Text>
            <Text style={styles.subtitle}>
              Ingresa tu correo electronico para cambiar la contraseña de tu
              cuenta
            </Text>

            <View style={styles.form}>
              <Input
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Button title="Crear nueva contraseña" onPress={handleRecover} />
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
    fontFamily: "Roboto-Bold",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 24,
    color: "#000000",
    textAlign: "left",
  },
  subtitle: {
    fontFamily: "Roboto-Regular",
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

export default Recover;
