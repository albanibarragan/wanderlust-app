import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserHeader from "./UserHeader";

const UserList = ({ user }) => {
  return (
    <View style={styles.container}>
      <UserHeader userId={user.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: "#B6DBFD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: "#000",
  },
});

export default UserList;
