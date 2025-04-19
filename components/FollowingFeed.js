import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import CardPost from "./CardPost";
import posts from "../assets/data/Mocks"; 

export default function FollowingFeed() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id + '-' + index} 
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
    backgroundColor: "#fff",
  },
});
