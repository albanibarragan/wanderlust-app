import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { ChevronLeft } from "react-native-feather";



export default function BackButton ({ title }) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log("Volver atrás");
    }
  };
  
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
      <ChevronLeft width={24} height={24} stroke={"#000"} strokeWidth={2} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: "transparent", // tu barra roja
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    paddingHorizontal: 16,
  },
  leftButton: {
    width: 40, // tamaño fijo
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

//se realizo un cambio