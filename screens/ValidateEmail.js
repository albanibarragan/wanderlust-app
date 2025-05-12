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

const ValidateEmail = ({ navigation }) => {
  const [code, setCode] = useState("");
  const logo = require("../assets/brujula-logo.png");

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log("Volver atrás");
    }
  };

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
              <BackButton onPress={handleBack} />
            </View>
            <Image source={logo} style={{ width: 100, height: 100 }} />

            <Text style={styles.title}>Codigo de verificación</Text>

            <View style={styles.form}>
              <Input
                label="Digita el codigo que se envio a tu correo"
                placeholder="xxxxxx"
                value={code}
                onChangeText={setCode}
                secureTextEntry={true}
              />

              <Button title="Siguiente" onPress={handleRecover} />
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

export default ValidateEmail;
