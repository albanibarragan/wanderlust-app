import { BookmarkIcon, ImageIcon, Settings,  } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View} from "react-native";

export default function ProfileTabs() {
  return (
    <View style={styles.containerTabs}>
      <TouchableOpacity >
        <ImageIcon size={24} color= "#000"
        />
      </TouchableOpacity>
      <TouchableOpacity >
        <BookmarkIcon size={24} color= "#000" 
        />
      </TouchableOpacity>
      <TouchableOpacity >
        <Settings size={24} color= "#000" 
        />
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
});
