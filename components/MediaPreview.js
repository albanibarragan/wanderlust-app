import React from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ITEM_WIDTH = 180;
const ITEM_HEIGHT = 180;

export default function MediaPreview({ mediaFiles, setMediaFiles }) {
  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {mediaFiles.map((file, index) => (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeMedia(index)}
            >
              <Ionicons name="close-circle" size={22} color="#ff4444" />
            </TouchableOpacity>

            {file.type.startsWith("image/") ? (
              <Image source={{ uri: file.uri }} style={styles.image} />
            ) : (
              <View style={styles.video}>
                <Ionicons name="videocam-outline" size={30} color="#fff" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: ITEM_HEIGHT + 20,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
