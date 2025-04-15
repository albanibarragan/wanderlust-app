import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft } from "react-native-feather";


export default function BackButton ({ title }) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navi && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log("Volver atrás");
    }
  };
  
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
      <ChevronLeft width={24} height={24} stroke={color} strokeWidth={2} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

