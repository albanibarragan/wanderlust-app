import { BookmarkIcon, ImageIcon, Settings,  } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileTabs() {
  const navigate = useNavigation();
    const handleSettings = () => {
      navigate.navigate("Settings");
    };
  return (
    <View style={styles.containerTabs}>
      <TouchableOpacity >
        <ImageIcon size={24} color= "#000"
        />
      </TouchableOpacity>
      
      <TouchableOpacity  onPress={handleSettings}>
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
