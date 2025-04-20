import { View, Text, TextInput, Image, StyleSheet, Dimensions } from "react-native";
import { currentUser } from "../assets/data/Mocks";

export default function HeaderCreatePost({ text, setText }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.username}>{currentUser.username}</Text>

          <TextInput
            style={[styles.textInput,]}
            placeholder="¿Qué hay de nuevo?"
            placeholderTextColor="#999"
            multiline
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
            scrollEnabled={false}         
            maxLength={500}
            numberOfLines={20}
            textBreakStrategy="simple"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    width: "100%",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#000",
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: "transparent", 
    borderRadius: 0,           
    minHeight: 40,                
    textAlignVertical: "top",       
    flexShrink: 1,                   
  },
});