import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CardPost from "../components/CardPost";
import posts from "../assets/data/Mocks";

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Favorites</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id + "-" + index}
        renderItem={({ item }) => <CardPost item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
 
});
