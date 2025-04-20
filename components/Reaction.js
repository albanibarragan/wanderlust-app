import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function Reaction({ icon, count, onIconPress, onCountPress, countColor  }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onIconPress}>
        {icon}
      </TouchableOpacity>

      <TouchableOpacity onPress={onCountPress}> 
        <Text style={[styles.count, { color: countColor }]}>{count}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 2,     
  },
  count: {
    marginLeft: 6,
    fontSize: 14,
  },
});