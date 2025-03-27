import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TextLink = ({
  text,
  onPress,
  color = "#2196F3",
  textAlign = "right",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          alignItems:
            textAlign === "center"
              ? "center"
              : textAlign === "right"
                ? "flex-end"
                : "flex-start",
        },
      ]}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default TextLink;
