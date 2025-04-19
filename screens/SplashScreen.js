import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const Logo = require("../assets/logo-app-movil.png");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("OnboardingScreen1");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={Logo} style={styles.logo} />
      <ActivityIndicator size="large" color="#bb5533" style={styles.indicator} />
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
  indicator: {
    marginTop: 100
  }
});
