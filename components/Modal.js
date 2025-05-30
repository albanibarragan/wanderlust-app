import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Button from "./Button";

const { width, height } = Dimensions.get("window");

const Modal = ({
  visible,
  onClose,
  title,
  message,
  buttonText = "Continuar",
  onButtonPress,
  showSecondaryButton = false,
  secondaryButtonText = "Cancelar",
}) => {

  
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonContainer}>
                  {showSecondaryButton && (
                    <Button
                      title={secondaryButtonText}
                      onPress={onClose}
                      style={[styles.button, styles.secondaryButton]}
                      textStyle={styles.secondaryButtonText}
                    />
                  )}
                  <Button
                    title={buttonText}
                    onPress={onButtonPress}
                    style={[styles.button, showSecondaryButton && styles.primaryButton]}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  button: {
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "#f2f2f2",
  },
  secondaryButtonText: {
    color: "#666",
  },
  primaryButton: {
    backgroundColor: "#FF5C5C",
  },
});

export default Modal;
