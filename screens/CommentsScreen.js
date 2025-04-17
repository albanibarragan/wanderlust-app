import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function CommentsScreen() {
    const { params } = useRoute();
    const { post } = params;
 
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const fakeComments = [
    { id: '1', name: 'Haley James', comment: 'Stand up for what you believe in' },
    { id: '2', name: 'Haley James', comment: 'Totally agree with this' },
    { id: '3', name: 'Haley James', comment: 'Beautiful photo!' },
    { id: '4', name: 'Haley James', comment: '🔥🔥🔥' },
  ];

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View styles={styles.container}>
    
 <View style={styles.sheetContent}>
            <Text style={styles.title}>Comentarios</Text>

            <FlatList
              data={fakeComments}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 80 }}
            />

            <View style={styles.inputContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.avatar}
              />
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder="Escribe un comentario..."
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text style={{ fontSize: 20 }}>📨</Text>
              </TouchableOpacity>
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    openButton: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    openButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    sheetContent: {
      flex: 1,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    commentItem: {
      flexDirection: 'row',
      gap: 10,
      paddingVertical: 8,
      alignItems: 'flex-start',
    },
    name: {
      fontWeight: 'bold',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
    },
    textInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
    },
    sendButton: {
      marginLeft: 10,
    },
  });