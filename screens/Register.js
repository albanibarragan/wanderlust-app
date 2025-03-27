import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import PhoneInput from "../components/PhoneInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+855");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !birthDate ||
      !email ||
      !password
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    alert("Registro exitoso");
  };

  const handleCountryCodePress = () => {
    // Aquí se abriría un selector de código de país
    console.log("Abrir selector de código de país");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log("Volver atrás");
    }
  };

  const termsAndConditionsText = (
    <Text style={styles.termsText}>
      Acepto los <Text style={styles.linkText}>términos y condiciones</Text>
    </Text>
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios"); // iOS only
    setBirthDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <BackButton onPress={handleBack} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Regístrate</Text>
              <Text style={styles.subtitle}>
                Ingresa tus datos para crear una cuenta
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <Input
              label="Nombre"
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Input
              label="Apellido"
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
            />

            <PhoneInput
              label="Número de teléfono"
              countryCode={countryCode}
              onCountryCodePress={handleCountryCodePress}
              phoneNumber={phoneNumber}
              onChangePhoneNumber={setPhoneNumber}
            />

            <View>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity
                style={styles.dateInputContainer}
                onPress={showDatepicker}
                activeOpacity={0.7}
              >
                <Text style={styles.dateInputText}>
                  {birthDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={birthDate}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <Input
              label="Email"
              placeholder="johnn.n@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="Contraseña"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Checkbox
              checked={acceptTerms}
              onToggle={() => setAcceptTerms(!acceptTerms)}
              textComponent={termsAndConditionsText}
            />

            <Button
              title="Registrar"
              onPress={handleRegister}
              disabled={loading}
            />

            <View style={styles.footer}>
              <Text onPress={handleLogin} style={styles.footerText}>
                ¿Ya tienes una cuenta?{" "}
                <Text style={styles.linkText}>Iniciar sesión</Text>
              </Text>
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
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingTop: 10,
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginTop: 8,
  },
  form: {
    width: "100%",
    maxWidth: 350,
  },
  termsText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#2196F3",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
  dateInputContainer: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
  },
  dateInputText: {
    fontSize: 16,
  },
});

export default Register;
