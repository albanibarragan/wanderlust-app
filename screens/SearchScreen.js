"use client";

import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import HeaderWanderlust from "../components/HeaderWanderlust";
import SearchBar from "../components/SearchBar";
import TabSelector from "../components/TabSelector";
import UserList from "../components/UserList";
import HashtagList from "../components/HashtagList";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("Br");
  const [selectedTab, setSelectedTab] = useState(2); // Hashtags tab selected by default
  const [filteredResults, setFilteredResults] = useState([]);

  const tabs = ["Usuarios", "Posts", "Hashtags"];

  // Datos de ejemplo para los resultados
  const hashtagResults = [
    { id: "1", title: "Brazil" },
    { id: "2", title: "Brazil" },
    { id: "3", title: "Brazil" },
  ];

  // Datos de ejemplo para usuarios
  const userResults = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "María García" },
    { id: "3", name: "Carlos Rodríguez" },
    { id: "4", name: "Ana Martínez" },
    { id: "5", name: "Pedro Sánchez" },
    { id: "6", name: "Laura López" },
    { id: "7", name: "Bruno Díaz" },
    { id: "8", name: "Brenda Torres" },
  ];

  useEffect(() => {
    filterResults();
  }, [searchQuery, selectedTab]);

  const filterResults = () => {
    if (selectedTab === 0) {
      // Usuarios tab
      const filtered = userResults.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    } else if (selectedTab === 1) {
      // Posts tab
      setFilteredResults([]); // No mostrar nada en Posts
    } else if (selectedTab === 2) {
      // Hashtags tab
      setFilteredResults(hashtagResults);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectTab = (index) => {
    setSelectedTab(index);
  };

  const handleResultPress = (item) => {
    console.log("Selected item:", item);
    // mostrar mensaje de que se selecciono el item
  };

  const renderItem = ({ item }) => {
    if (selectedTab === 0) {
      // Usuarios tab
      return (
        <UserList name={item.name} onPress={() => handleResultPress(item)} />
      );
    } else if (selectedTab === 2) {
      // Hashtags tab
      return (
        <HashtagList
          title={item.title}
          onPress={() => handleResultPress(item)}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWanderlust />
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      <TabSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
      />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          selectedTab === 1 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay resultados para mostrar
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron resultados</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default SearchScreen;
