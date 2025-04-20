import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { users, currentUser } from "../assets/data/Mocks";

export default function UserHeader({ userId, showCommentBox = false, subText = "", textColor = "#000", onCloseModal, time, location }) {
  const navigation = useNavigation();

  const user = users.find((u) => u.id === userId);

  if (!user) return null;

  const handlePress = () => {
    onCloseModal?.();
    if (user?.id === currentUser.id) {
      navigation.navigate("Profile");
    } else {
      navigation.push("OtherProfile", {
        userId: user.id,
        isMyProfile: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </TouchableOpacity>

      {showCommentBox ? (
        <TextInput
          placeholder="¿Qué hay de nuevo?"
          placeholderTextColor="#999"
          style={[styles.commentInput, { color: textColor }]}
        />
      ) : (
        <TouchableOpacity onPress={handlePress} style={styles.userInfo}>
          <View style={styles.row}>
            <Text style={[styles.username, { color: textColor }]} numberOfLines={1}>
              {user.username}
            </Text>
            {time && (
              <Text style={[styles.time, { color: textColor, opacity: 0.7 }]}>
                {time}
              </Text>
            )}
          </View>

          {user.location && (
            <Text style={[styles.location, { color: textColor, opacity: 0.7 }]}>
              {user.location}
            </Text>
          )}
          {subText ? (
            <Text style={[styles.subText, { color: textColor, opacity: 0.7 }]}>{subText}</Text>
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    maxWidth: "70%",
  },
  time: {
    fontSize: 12,
    marginLeft: 8,
  },
  location: {
    fontSize: 13,
    marginTop: 2,
  },
  subText: {
    fontSize: 13,
    marginTop: 2,
  },
  commentInput: {
    flex: 1,
    fontSize: 15,
  },
});

