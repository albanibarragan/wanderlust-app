import { SendIcon, View } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Modal, TextInput } from "react-native";

export default function ModalPost({ visible, onClose, title, data, renderItem, isComment = false,
}) {
    const [commentText, setCommentText] = useState("");

    const handleSendComment = () => {
        if (!commentText.trim()) return;
        console.log("Comentario enviado:", commentText);
        setCommentText("");
      };
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

      <View style={[styles.modal, isComment && { paddingBottom: 70 }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {isComment && (
        <View style={styles.commentInputBar}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/75.jpg",
            }}
            style={styles.commentAvatar}
          />
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Escribe un comentario..."
            style={styles.commentInput}
          />
          <TouchableOpacity onPress={handleSendComment}>
             <SendIcon size={24} color="#007aff" />
          </TouchableOpacity>
        </View>
      )}


    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 16,
    maxHeight: "80%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  commentInputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
});