import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView } from "react-native";
import CardProfile from "../components/CardProfile";
import SettingsItem from "../components/SettingsItem";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { currentUser } from "../assets/data/Mocks";
import Icon from "react-native-vector-icons/Feather";
import BackButton from "../components/BackButton";
import ChangeUsernameForm from "../components/ChangeUsernameForm";
import ChangeNameForm from "../components/ChangeNameForm";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePhoneForm from "../components/ChangePhoneForm";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUserId } from "../assets/api/auth";
import { getUserById } from "../assets/api/UserService";

export default function SettingScreen({}) {
  const [activeSetting, setActiveSetting] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const navigation = useNavigation();

  const handleLogout = async () => {
    console.log("Cerrando sesión...");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getCurrentUserId();
      if (!userId) return;

      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CardProfile
          avatar={user?.profilePicture}
          name={`${user?.firstName} ${user?.lastName}`}
          username={user?.username}
          stats={{ posts: 0, followers: 0, following: 0 }}
          bio={user?.bio}
          showSettings={true}
        />
        {activeSetting === null && (
          <View style={styles.settingsList}>
            <SettingsItem
              Icon={() => <Icon name="user" size={20} color="#555" />}
              title="Usuario"
              subtitle={user?.username}
              onPress={() => setActiveSetting("username")}
            />
            <SettingsItem
              Icon={() => <Icon name="info" size={20} color="#555" />}
              title="Nombre"
              subtitle={`${user?.firstName} ${user?.lastName}`}
              onPress={() => setActiveSetting("name")}
            />
            <SettingsItem
              Icon={() => <Icon name="mail" size={20} color="#555" />}
              title="Correo electrónico"
              subtitle={user?.email}
              onPress={() => setActiveSetting("email")}
            />
            <SettingsItem
              Icon={() => <Icon name="lock" size={20} color="#555" />}
              title="Contraseña"
              subtitle="********"
              onPress={() => setActiveSetting("password")}
            />
            <SettingsItem
              Icon={() => <Icon name="phone" size={20} color="#555" />}
              title="Número de teléfono"
              subtitle={user?.phone}
              onPress={() => setActiveSetting("phone")}
            />
            <SettingsItem
              Icon={() => <Icon name="log-out" size={20} color="#e33" />}
              title="Cerrar sesión"
              onPress={handleLogout}
              isLogout
            />
          </View>
        )}
        <View style={styles.settingContent}>
          {activeSetting === "username" && (
            <ChangeUsernameForm
              onCancel={() => setActiveSetting(null)}
              onChange={(newUsername) => {
                console.log("Nuevo nombre usuario recibido:", newUsername);
                setUsername(newUsername);
              }}
            />
          )}
          {activeSetting === "name" && (
            <ChangeNameForm
              onCancel={() => setActiveSetting(null)}
              onChange={(newName) => {
                console.log("Nuevo nombre recibido:", newName);
                setName(newName);
              }}
            />
          )}
          {activeSetting === "email" && (
            <ChangeEmailForm
              onCancel={() => setActiveSetting(null)}
              onChange={(newEmail) => {
                console.log("Nuevo nombre recibido:", newEmail);
                setEmail(newEmail);
              }}
            />
          )}
          {activeSetting === "password" && (
            <ChangePasswordForm onCancel={() => setActiveSetting(null)} />
          )}
          {activeSetting === "phone" && (
            <ChangePhoneForm
              onCancel={() => setActiveSetting(null)}
              onChange={(newPhone) => {
                console.log("Nuevo Numero de telefono recibido:", newPhone);
                setPhone(newPhone);
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  settingsList: {
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingContent: {
    marginTop: 16,
  },
});
