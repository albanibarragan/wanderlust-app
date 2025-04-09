import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Buscar"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
    borderRadius: 18,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default SearchBar;
