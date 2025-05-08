import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWanderlust from "../components/HeaderWanderlust";
import ExploreFeed from "../components/ExploreFeed";
import FollowingFeed from "../components/FollowingFeed";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Modal from "../components/Modal";

const layout = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleBackPress = () => {
    setShowExitModal(true);
    return true;
  };

  const handleExitApp = () => {
    setShowExitModal(false);
    BackHandler.exitApp();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const ExploreRoute = () => <ExploreFeed />;

  const FollowingRoute = () => <FollowingFeed />;

  const [routes] = useState([
    { key: "explore", title: "Expolorar" },
    { key: "following", title: "Siguiendo" },
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
      <Modal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Salir de la aplicación"
        message="¿Estás seguro que deseas salir de la aplicación?"
        buttonText="Sí, salir"
        onButtonPress={handleExitApp}
        showSecondaryButton={true}
        secondaryButtonText="Cancelar"
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
