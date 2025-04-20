import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import CardProfile from "../components/CardProfile";
import SettingsItem from "../components/SettingsItem";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { currentUser } from "../assets/data/Mocks";
import { User, Info, Mail, Lock, Phone, LogOut } from "lucide-react-native";
import BackButton from "../components/BackButton";
import ChangeUsernameForm from "../components/ChangeUsernameForm";
import ChangeNameForm from "../components/ChangeNameForm";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePhoneForm from "../components/ChangePhoneForm";
import { useNavigation } from "@react-navigation/native";

export default function SettingScreen() {
  const [activeSetting, setActiveSetting] = useState(null);
  const [username, setUsername] = useState(currentUser.username);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <CardProfile
        avatar={currentUser.avatar}
        name={currentUser.name}
        username={currentUser.username}
        stats={currentUser.stats}
        bio={currentUser.bio}
        showSettings={true}
      />
      {activeSetting === null && (
        <View style={styles.settingsList}>
          <SettingsItem
            Icon={User}
            title="Usuario"
            subtitle={currentUser.username}
            onPress={() => setActiveSetting("username")}
          />
          <SettingsItem
            Icon={Info}
            title="Nombre"
            subtitle={currentUser.name}
            onPress={() => setActiveSetting("name")}
          />
          <SettingsItem
            Icon={Mail}
            title="Correo electrónico"
            subtitle={currentUser.email}
            onPress={() => setActiveSetting("email")}
          />
          <SettingsItem
            Icon={Lock}
            title="Contraseña"
            subtitle="********"
            onPress={() => setActiveSetting("password")}
          />
          <SettingsItem
            Icon={Phone}
            title="Número de teléfono"
            subtitle={currentUser.phone}
            onPress={() => setActiveSetting("phone")}
          />
          <SettingsItem
            Icon={LogOut}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
