import Icon from "react-native-vector-icons/Feather";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileTabs() {
  const navigate = useNavigation();

  const handleSettings = () => {
    navigate.navigate("Settings");
  };

  return (
    <View style={styles.containerTabs}>
      <TouchableOpacity>
        <Icon name="image" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSettings}>
        <Icon name="settings" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: "100%",
  },
});
