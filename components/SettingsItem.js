import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsItem({ Icon, title, subtitle, onPress }) {
    return (
      <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
        <Icon size={22} color="#007bff" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  
const styles = StyleSheet.create({
    settingsTitle: {
      marginTop: 20,
      marginLeft: 16,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "600",
      color: "#000",
    },
    settingsItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    icon: {
      fontSize: 22,
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000",
    },
    itemSubtitle: {
      fontSize: 13,
      color: "#777",
    },
  });