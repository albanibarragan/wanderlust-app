"use client";

import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import HeaderWanderlust from "../components/HeaderWanderlust";
import SearchBar from "../components/SearchBar";
import TabSelector from "../components/TabSelector";
import HashtagList from "../components/HashtagList";
import { users, posts } from "../assets/data/Mocks";
import UserHeader from "../components/UserHeader";
import CardPost from "../components/CardPost";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const tabs = ["Usuarios", "Publicaciones", "Etiquetas"];
  const hashtagResults = [
    { id: "1", title: "Brazil" },
    { id: "2", title: "Uruguay" },
    { id: "3", title: "Francia" },
  ];

  useEffect(() => {
    filterResults();
  }, [searchQuery, selectedTab]);

  const filterResults = () => {
    if (selectedTab === 0) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    } else if (selectedTab === 1) {
      const filtered = posts.filter((post) =>
        post.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    } else if (selectedTab === 2) {
      const filtered = hashtagResults.filter((hashtag) =>
        hashtag.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
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
  };

  const renderItem = ({ item }) => {
    if (selectedTab === 0) {
      return (
        <View style={styles.userCard}>
          <UserHeader userId={item.id} textColor="#000" />
        </View>
      );
    } else if (selectedTab === 1) {
      return <CardPost item={item} />;
    } else if (selectedTab === 2) {
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
  userCard: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default SearchScreen;
