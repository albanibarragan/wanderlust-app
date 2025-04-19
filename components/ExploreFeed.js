import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import posts from '../assets/data/Post';
import PhotoCard from "../components/PhotoCard"; 

const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const cardWidth = (screenWidth / 2) - 20;

export default function ExploreFeed() {
  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PhotoCard post={item} cardWidth={cardWidth} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          windowSize={10}
        />
      ) : (
        <Text style={styles.emptyText}>No posts available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: cardMargin,
    
  },
  listContent: {
    paddingBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },
});
