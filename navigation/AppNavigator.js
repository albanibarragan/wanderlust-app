import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import OnboardingScreen1 from "../screens/OnboardingScreen1";
import OnboardingScreen2 from "../screens/OnboardingScreen2";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Recover from "../screens/Recover";
import RecoverPassword from "../screens/RecoverPassword";
import Register from "../screens/Register";
import SearchScreen from "../screens/SearchScreen";
import Splash from "../screens/SplashScreen";
import Details from "../screens/Details";
import FavoriteScreen from "../screens/FavoriteScreen";
import SettingScreen from "../screens/SettingScreen";
import ValidateEmail from "../screens/ValidateEmail";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarMenu,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={24} color={focused ? "#000" : "#aaa"} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="search" size={24} color={focused ? "#000" : "#aaa"} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButton}>
              <Icon name="plus" size={24} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="bookmark" size={24} color={focused ? "#000" : "#aaa"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userId: null, isMyProfile: true }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={24} color={focused ? "#000" : "#aaa"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Recover" component={Recover} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="ValidateEmail" component={ValidateEmail} />

        {isAuthenticated && (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="PostDetail" component={Details} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen
              name="OtherProfile"
              component={ProfileScreen}
              initialParams={{ userId: null, isMyProfile: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarMenu: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOpacity: 0.08,
    paddingHorizontal: 20,
  },
  createButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#FF6B4A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 10,
  },
});
