import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import posts from '../assets/data/Post';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 8;
const cardWidth = (screenWidth / 2) - cardMargin * 3;

const PostCard = ({ post }) => (
  <View style={[styles.card, { width: cardWidth }]}>
    <View style={styles.header}>
      <Image source={{ uri: post.avatar }} style={styles.avatar} />
      <Text style={styles.user}>{post.user}</Text>
    </View>
    <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.footer}>
      <Text>{post.countryFlag}</Text>
      <Text style={styles.time}>Posted {post.time}</Text>
    </View>
  </View>
);

export default function ExploreScreen (){
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: cardMargin,
  },
  card: {
    marginBottom: cardMargin * 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2, // Sombra en Android
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  user: {
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 150,
  },
  footer: {
    padding: 8,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});
