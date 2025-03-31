import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardPost({ item }) {

  const { username, avatar, image, time, content } = item;

  return (
    <SafeAreaView style={styles.card}>
      <View style={styles.imageWrapper} >
      <Image source={{ uri: image }} style={styles.mainImage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    paddingHorizontal: 8,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 4, 
  },
  mainImage: {
    width: '100%',      
    aspectRatio: 4 / 5,   
    resizeMode: 'cover',  
  },
});