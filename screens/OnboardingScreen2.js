import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Brujula from "../assets/brujula-logo.png";
import StoriesIllustration from "../assets/stories-illustration.png";

export default function OnboardingScreen2({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerlogo}>
        <Image source={Brujula} style={styles.brujula} />
        <Text style={styles.titleBienvenido}>Wanderlust</Text>
      </View>
      <Image source={StoriesIllustration} style={styles.storiesIllustration} />
      <Text style={styles.titleBienvenido}>
        Inspírate con historias de viaje y crea las tuyas
      </Text>
      <Text style={styles.subtitleBienvenido}>
        Únete a una comunidad de viajeros apasionados. Comparte fotos, consejos
        y anécdotas de tus aventuras.
      </Text>
      <TouchableHighlight
        onPress={() => navigation.navigate("Login")}
        style={styles.buttonArrow}
      >
        <Text style={styles.arrow}>→</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0FA3E2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  storiesIllustration: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  containerlogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBienvenido: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitleBienvenido: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  brujula: {
    width: 50,
    height: 50,
  },
  arrow: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    lineHeight: 28,
  },
  buttonArrow: {
    backgroundColor: "#fff",
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
});
