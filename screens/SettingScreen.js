import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import CardProfile from "../components/CardProfile";
import SettingsItem from "../components/SettingsItem";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { currentUser } from "../assets/data/Mocks";
import { User, Info, Mail, Lock, Phone } from "lucide-react-native";
import BackButton from "../components/BackButton";

export default function SettingScreen() {
  const [activeSetting, setActiveSetting] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
        <BackButton/> 
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
          <SettingsItem Icon={User} title="Usuario" subtitle={currentUser.username} onPress={() => setActiveSetting("username")} />
          <SettingsItem Icon={Info} title="Nombre" subtitle={currentUser.name} onPress={() => setActiveSetting("name")} />
          <SettingsItem Icon={Mail} title="Correo electrónico" subtitle={currentUser.email} onPress={() => setActiveSetting("email")} />
          <SettingsItem Icon={Lock} title="Contraseña" subtitle="********" onPress={() => setActiveSetting("password")} />
          <SettingsItem Icon={Phone} title="Número de teléfono" subtitle={currentUser.phone} onPress={() => setActiveSetting("phone")} />
        </View>
      )}
      <View style={styles.settingContent}>
        {activeSetting === "username" && <ChangeUsernameForm onCancel={() => setActiveSetting(null)} />}
        {activeSetting === "name" && <ChangeNameForm onCancel={() => setActiveSetting(null)} />}
        {activeSetting === "email" && <ChangeEmailForm onCancel={() => setActiveSetting(null)} />}
        {activeSetting === "password" && <ChangePasswordForm onCancel={() => setActiveSetting(null)} />}
        {activeSetting === "phone" && <ChangePhoneForm onCancel={() => setActiveSetting(null)} />}
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
