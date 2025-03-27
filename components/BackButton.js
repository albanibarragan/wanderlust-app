import { TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft } from "react-native-feather";

const BackButton = ({ onPress, color = "#000000" }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ChevronLeft width={24} height={24} stroke={color} strokeWidth={2} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
  },
});

export default BackButton;
