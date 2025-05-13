import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import PhoneInput from "../components/PhoneInput";
import Modal from "../components/Modal";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+855");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phoneNumber ||
      !birthDate ||
      !email ||
      !password
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (username.includes(" ")) {
      alert("El nombre de usuario no debe contener espacios");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Correo electrónico no válido");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone: `${countryCode}${phoneNumber}`,
        birthday: birthDate.toISOString().split("T")[0],
        username,
      });

      console.log("Registro exitoso:", res.data);
      setIsModalVisible(true);
      await AsyncStorage.setItem("token", token);
      navigation.replace("Main");
    } catch (err) {
      const msg = err?.response?.data?.msg || "Error al registrar usuario";
      alert(msg);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryCodePress = () => {
    console.log("Abrir selector de código de país");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Regístrate</Text>
            <Text style={styles.subtitle}>
              Ingresa tus datos para crear una cuenta
            </Text>
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

            <Input
              label="Nombre de usuario"
              placeholder="johndoe123"
              value={username}
              onChangeText={setUsername}
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
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <Input
              label="Correo electrónico"
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

            <Input
              label="Confirmar contraseña"
              placeholder="********"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            <Checkbox
              checked={acceptTerms}
              onToggle={() => setAcceptTerms(!acceptTerms)}
              textComponent={termsAndConditionsText}
            />

            <Button
              title={loading ? "Registrando..." : "Registrar"}
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

        <Modal
          visible={isModalVisible}
          title="¡Registro exitoso!"
          message="Tu cuenta ha sido creada correctamente."
          buttonText="Iniciar sesión"
          onButtonPress={() => {
            setIsModalVisible(false);
            navigation.navigate("Login");
          }}
          onClose={() => setIsModalVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
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
    color: "#666",
  },
  dateInputContainer: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
  },
  dateInputText: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
});

export default Register;
