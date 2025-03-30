import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
import MasonryList from "react-native-masonry-list";

export default function ExploreFeed({ navigation }) {
  const posts = [
    {
      uri: 'https://picsum.photos/300/400',
      user: 'Bruna S.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      flag: 'https://flagcdn.com/it.png',
      time: 'Posted 2hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Ana C.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      flag: 'https://flagcdn.com/fr.png',
      time: 'Posted 1hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Joyce C.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      flag: 'https://flagcdn.com/br.png',
      time: 'Posted 2hr ago',
    },{
      uri: 'https://picsum.photos/300/400',
      user: 'Bruna S.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      flag: 'https://flagcdn.com/it.png',
      time: 'Posted 2hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Ana C.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      flag: 'https://flagcdn.com/fr.png',
      time: 'Posted 1hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Joyce C.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      flag: 'https://flagcdn.com/br.png',
      time: 'Posted 2hr ago',
    },{
      uri: 'https://picsum.photos/300/400',
      user: 'Bruna S.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      flag: 'https://flagcdn.com/it.png',
      time: 'Posted 2hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Ana C.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      flag: 'https://flagcdn.com/fr.png',
      time: 'Posted 1hr ago',
    },
    {
      uri: 'https://picsum.photos/200/300',
      user: 'Joyce C.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      flag: 'https://flagcdn.com/br.png',
      time: 'Posted 2hr ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MasonryList
        images={posts.map(post => ({
          uri: post.uri,
          dimensions: { width: 300, height: 400 }, // evitar error
          title: (
            <View style={styles.postInfo}>
              <View style={styles.userInfo}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{post.user}</Text>
              </View>
              <Image source={{ uri: post.flag }} style={styles.flag} />
              <Text style={styles.time}>{post.time}</Text>
            </View>
          ),
        }))}
        columns={2}
        spacing={5}
        imageContainerStyle={styles.imageContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  postInfo: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  username: {
    fontWeight: '600',
  },
  flag: {
    width: 20,
    height: 15,
    resizeMode: 'cover',
    marginVertical: 2,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
});
