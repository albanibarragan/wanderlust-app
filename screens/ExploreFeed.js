import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import posts from '../assets/data/Post';
import PhotoCard from '../components/PhotoCard';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 8;
const cardWidth = (screenWidth / 2) - cardMargin * 3;

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PhotoCard post={item} cardWidth={cardWidth} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
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
    padding: cardMargin,
  },
});
