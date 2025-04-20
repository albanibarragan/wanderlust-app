import { BookmarkIcon, ImageIcon, Settings,  } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StatsProfile({ posts = 0, followers = 0, following = 0 }) {
  return (
    <View style={styles.containerTabs}>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>{posts}</Text>
        <Text style={styles.statLabel}>Publicaciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>{followers}</Text>
        <Text style={styles.statLabel}>Seguidores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>{following}</Text>
        <Text style={styles.statLabel}>Siguiendo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTabs: {
    flexDirection: "row",     
    justifyContent: "space-around",
    alignItems: "center",           
    backgroundColor: "#ffff",      
    paddingVertical: 10,           
    width: '100%' 
  },
  statItem:{
    alignItems: "center",
  }, 
  statNumber: {
    fontWeight: "bold",
    fontSize: 20,
  }, 
  statLabel: {
    fontSize: 16,
    color: "#888",
  }, 
});
