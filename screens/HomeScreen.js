import React, { use, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";
import ExploreFeed from "../components/ExploreFeed";
import FollowingFeed from "../components/FollowingFeed";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const layout = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = useState(0);

  const ExploreRoute = () => <ExploreFeed />;

  const FollowingRoute = () => <FollowingFeed />;

  const [routes] = useState([
    { key: "explore", title: "Explore" },
    { key: "following", title: "Following" },
  ]);

  const renderScene = SceneMap({
    explore: ExploreRoute,
    following: FollowingRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWanderlust />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#FF5C5C" }}
            style={styles.activeTab}
            tabStyle={{ borderRadius: 20 }}
            activeColor="black"
            inactiveColor="#888"
            labelStyle={{ fontWeight: "bold" }}
          />
        )}
      />
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
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    margin: 10,
  },
  tabText: {
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
