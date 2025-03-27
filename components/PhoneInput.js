import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ChevronDown } from "react-native-feather";

const PhoneInput = ({
  label,
  countryCode,
  onCountryCodePress,
  phoneNumber,
  onChangePhoneNumber,
  placeholder = "123 456 789",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={onCountryCodePress}
        >
          <Text style={styles.countryCode}>{countryCode}</Text>
          <ChevronDown width={16} height={16} stroke="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={onChangePhoneNumber}
          keyboardType="phone-pad"
        />
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
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: "#E1E1E1",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

export default PhoneInput;
