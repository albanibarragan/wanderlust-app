import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";
import ExploreFeed from "../components/ExploreFeed";
import FollowingFeed from "../components/FollowingFeed";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWanderlust />
      <View style={styles.containertabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "explore" && styles.activeTab]}
        onPress={() => setActiveTab("explore")}
      >
        <Text style={[styles.tabText, activeTab === "explore" && styles.activeTabText]}>
          Explore
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "following" && styles.activeTab]}
        onPress={() => setActiveTab("following")}
      >
        <Text style={[styles.tabText, activeTab === "following" && styles.activeTabText]}>
        Following
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.feedContainer}>
        {activeTab === "explore" ? <ExploreFeed /> : <FollowingFeed />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containertabs: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",  
    borderRadius: 30,             
    padding: 4,                   
    margin: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    color: "#888",
    alignItems: "center",
    borderRadius: 20,  
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText:{
    color: "#888", 
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",               
    fontWeight: "bold",
  },
  feedContainer: {
    flex: 1, 
  },
});
