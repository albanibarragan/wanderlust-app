import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function Reaction({ icon, count, onIconPress, onCountPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onIconPress}>
        {icon}
      </TouchableOpacity>

      <TouchableOpacity onPress={onCountPress}> 
        <Text style={styles.count}>{count}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,     
  },
  count: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
  },
});