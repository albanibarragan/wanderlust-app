import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({
  title,
  onPress,
  backgroundColor = "#0FA3E2",
  textColor = "#FFFFFF",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#CCCCCC" : backgroundColor },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
