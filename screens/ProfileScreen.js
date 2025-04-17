import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWanderlust from '../components/HeaderWanderlust';
import CardProfile from '../components/CardProfile';
import { useState } from 'react';
import ProfileTabs from '../components/ProfileTabs';

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("posts");
  const postsUser = [
    { id: "1", image: "https://picsum.photos/200/300" },
    { id: "2", image: "https://picsum.photos/201/300" },
    { id: "3", image: "https://picsum.photos/202/300" },
    { id: "4", image: "https://picsum.photos/203/300" },
    { id: "5", image: "https://picsum.photos/200/300" },
    { id: "6", image: "https://picsum.photos/201/300" },
    { id: "7", image: "https://picsum.photos/202/300" },
    { id: "8", image: "https://picsum.photos/203/300" },
    { id: "9", image: "https://picsum.photos/200/300" },
    { id: "10", image: "https://picsum.photos/201/300" },
    { id: "11", image: "https://picsum.photos/202/300" },
    { id: "12", image: "https://picsum.photos/203/300" },
  ];

  const user = {
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Lucas Scott",
    username: "lucasscott3",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt #hashtag",
    stats: {
      posts: 3,
      followers: 21,
      following: 10,
    },
  };

  return (
    <SafeAreaView  style={styles.container}>
      <HeaderWanderlust />
      <CardProfile
        avatar={user.avatar}
        name={user.name}
        username={user.username}
        bio={user.bio}
        stats={user.stats}
        showTabs = {true}
      >
      </CardProfile>
      <View style={styles.content}>
        {activeTab === "posts" && (
          <FlatList
            data={postsUser}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
          />
        )}
        </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  postImage: {
    width: "48%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    
  },
});