import { BookmarkIcon, ImageIcon, Settings,  } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StatsProfile() {
  return (
    <View style={styles.containerTabs}>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>20</Text>
        <Text style={styles.statLabel}>posts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>15</Text>
        <Text style={styles.statLabel}>followers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statItem}>
        <Text style={styles.statNumber}>50</Text>
        <Text style={styles.statLabel}>following</Text>
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
