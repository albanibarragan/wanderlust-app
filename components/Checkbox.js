import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Check } from "react-native-feather";

const Checkbox = ({ label, checked, onToggle, textComponent }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Check width={16} height={16} stroke="#FFFFFF" />}
      </View>
      {textComponent ? (
        textComponent
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  label: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});

export default Checkbox;
