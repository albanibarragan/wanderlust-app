import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Icon
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    paddingLeft: 10,
  },
});

export default Input;
