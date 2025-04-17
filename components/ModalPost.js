import { View } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native-web";

export default function ModalPost({  visible,
    onClose,
    title,
    data,
    renderItem, }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
      },
      modal: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "60%",
        position: "absolute",
        bottom: 0,
        width: "100%",
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
      },
});