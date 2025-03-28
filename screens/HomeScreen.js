import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWanderlust />
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("explore")}>
          <Text
            style={[styles.tab, activeTab === "explore" && styles.activeTab]}
          >
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("following")}>
          <Text
            style={[styles.tab, activeTab === "following" && styles.activeTab]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {activeTab === "explore" ? (
          <Text>Explore Content</Text>
        ) : (
          <Text>Following Content</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    borderBottomWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#888',
        paddingBottom: 4,
  },
  tab: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 4,
  },
});
