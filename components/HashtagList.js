// components/HashtagList.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HashtagList({ tags, onPress }) {
  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <TouchableOpacity key={tag} onPress={() => onPress(tag)}>
          <Text style={styles.hashtag}>#{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    paddingHorizontal: 0,
    gap: 8,
  },
  hashtag: {
    color: "#4f4f4f",
    fontWeight: "bold",
    fontSize: 13,
    marginRight: 8,
    marginBottom: 4,
  },
});