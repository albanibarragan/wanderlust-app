import { Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundBrazil from "../assets/background-brazil.jpg";
import BrujulaLogo from "../assets/brujula-logo.png";

export default function OnboardingScreen1({ navigation }) {
  return (
    <ImageBackground source={BackgroundBrazil} style={styles.background}>
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image source={BrujulaLogo} style={styles.logo} />

        {/* Título y subtítulo */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>
            Estamos emocionados de que compartas tus experiencias y recuerdos de tus viajes.
          </Text>
        </View>

        {/* Botón */}
        <TouchableHighlight
          style={styles.button}
          underlayColor="#e5e5e5"
          onPress={() => navigation.navigate("OnboardingScreen2")}
        >
          <Text style={styles.buttonText}>Vamos</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 60,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#f2f2f2",
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#FF6B4A",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
