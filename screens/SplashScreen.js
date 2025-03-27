import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo = require("../assets/logo-app-movil.png");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("OnboardingScreen1");
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 323,
    height: 128,
    resizeMode: "contain",
  },
});
