import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import CardPost from "../components/CardPost";

export default function FollowingFeed() {
  const posts = [
    {
      id: "1",
      username: "Bruna S.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      time: "2h ago",
      content: "Exploring Venice 🇮🇹",
      image: "https://picsum.photos/300/400?random=1",
    },
    {
      id: "2",
      username: "Liam D.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "1h ago",
      content: "Sunset in Bali 🌅",
      image: "https://picsum.photos/300/400?random=2",
    },
    {
      id: "3",
      username: "Sofia M.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      time: "3h ago",
      content: "Café parisino ☕🇫🇷",
      image: "https://picsum.photos/300/400?random=3",
    },
    {
      id: "4",
      username: "Carlos R.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      time: "5h ago",
      content: "Mountains are calling 🏔️",
      image: "https://picsum.photos/300/400?random=4",
    },
    {
      id: "5",
      username: "Emily T.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      time: "30min ago",
      content: "Louvre visit 🎨",
      image: "https://picsum.photos/300/400?random=5",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardPost item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
