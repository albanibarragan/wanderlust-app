import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundPortugal from "../assets/background-portugal.jpg";
import BrujulaLogo from "../assets/brujula-logo.png";

export default function OnboardingScreen2({ navigation }) {
  return (
    <ImageBackground source={BackgroundPortugal} style={styles.background}>
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        {/* Header con logo y título */}
        <View style={styles.header}>
          <Image source={BrujulaLogo} style={styles.logo} />
          <Text style={styles.appName}>Wanderlust</Text>
        </View>

        {/* Contenido inferior */}
        <View style={styles.bottomSection}>
          <Text style={styles.title}>
            Inspírate con historias de viaje y crea las tuyas
          </Text>

          <Text style={styles.subtitle}>
            Únete a una comunidad de viajeros apasionados.{"\n"}Comparte fotos,
            consejos y anécdotas de tus aventuras.
          </Text>

          {/* Indicadores de progreso */}
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

          {/* Botón siguiente */}
          <TouchableHighlight
            style={styles.nextButton}
            onPress={() => navigation.replace("Login")}
            underlayColor="#e85c3d"
          >
            <Text style={styles.nextButtonText}>→</Text>
          </TouchableHighlight>
        </View>
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
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#f2f2f2",
    lineHeight: 22,
    marginBottom: 30,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 16,
  },
  nextButton: {
    backgroundColor: "#FF6B4A",
    padding: 15,
    borderRadius: 32,
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    shadowColor: "#000",
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    lineHeight: 28,
  },
});