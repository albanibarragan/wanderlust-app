import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import HeaderWanderlust from "../components/HeaderWanderlust";
import SearchBar from "../components/SearchBar";
import TabSelector from "../components/TabSelector";
import HashtagList from "../components/HashtagList";
import { users, posts } from "../assets/data/Mocks";
import UserHeader from "../components/UserHeader";
import CardPost from "../components/CardPost";
import { searchGlobal } from "../assets/api/searchService";

const SearchScreen = () => {
  
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
        data={getCurrentResults()}
        keyExtractor={(item) => item._id || item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron resultados</Text>
          </View>
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
