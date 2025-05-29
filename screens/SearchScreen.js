import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import HeaderWanderlust from "../components/HeaderWanderlust";
import SearchBar from "../components/SearchBar";
import TabSelector from "../components/TabSelector";
import HashtagList from "../components/HashtagList";
import UserHeader from "../components/UserHeader";
import CardPost from "../components/CardPost";
import { searchGlobal } from "../assets/api/search";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [usersResults, setUsersResults] = useState([]);
  const [postsResults, setPostsResults] = useState([]);
  const tabs = ["Usuarios", "Publicaciones"];

  const fetchSearchResults = async () => {
    try {
    const { users, posts } = await searchGlobal(searchQuery);
    console.log("📦 Resultados de búsqueda:", { users, posts });
    setUsersResults(users);
    setPostsResults(posts);
  } catch (error) {
    console.error("❌ Error al buscar:", error);
    setUsersResults([]);
    setPostsResults([]);
  }
  }
    useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setUsersResults([]);
      setPostsResults([]);
    }
  }, [searchQuery]);

  const getCurrentResults = () => {
    if (selectedTab === 0) return usersResults;
    if (selectedTab === 1) return postsResults;
    return []; // en caso de etiquetas
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
        <UserHeader user={item} textColor="#000" />
      </View>
    );
  } else if (selectedTab === 1) {
    const safeItem = {
      ...item.post, // plano
      image: item.media?.[0]?.url || null,
      locationDescription:
        typeof item.post.location === "object" && item.post.location?.description
          ? item.post.location.description
          : "Ubicación no especificada",
    };
    return <CardPost item={safeItem} />;
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
