import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabSelector = ({ tabs, selectedTab, onSelectTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, selectedTab === index && styles.selectedTab]}
          onPress={() => onSelectTab(index)}
        >
          <Text style={styles.tabText}>{tab}</Text>
          {selectedTab === index && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "relative",
  },
  selectedTab: {
    fontWeight: "bold",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#2E64E5",
    borderRadius: 3,
  },
});

export default TabSelector;
