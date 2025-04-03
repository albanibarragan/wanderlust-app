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
      content:
        "Exploring Venice 🇮🇹. Walking through narrow canals and colorful streets filled with music, people, and the smell of fresh pasta. A dream come true! I could stay here forever just watching the gondolas float by.",
      image:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: "2",
      username: "Liam D.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "1h ago",
      content:
        "Sunset in Bali 🌅. The sky turned orange and pink while I sat on the beach with a coconut in hand. Life here moves slowly, and it's beautiful to just exist without rushing. Highly recommend for anyone looking to disconnect.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: "3",
      username: "Sofia M.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      time: "3h ago",
      content:
        "Café parisino ☕🇫🇷. Morning coffee, buttery croissants, and the sound of French chatter all around. I sat for hours just people-watching, journaling, and enjoying the crisp spring air of Paris. What a vibe!",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: "4",
      username: "Carlos R.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      time: "5h ago",
      content:
        "Mountains are calling 🏔️. Hiking the Swiss Alps has been one of the most humbling and breathtaking experiences of my life. Every corner hides a new wonder, from clear lakes to snowy peaks. I feel so alive and inspired up here.",
      image:
        "https://images.unsplash.com/photo-1585421514287-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: "5",
      username: "Emily T.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      time: "30min ago",
      content:
        "Louvre visit 🎨. Got lost in art for hours. From Da Vinci to sculptures I had only seen in books, everything came alive. If you ever visit Paris, don’t miss the Louvre. Just wear comfy shoes — you’ll need them.",
      image:
        "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1&ixlib=rb-4.0.3&q=80&w=800",
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
