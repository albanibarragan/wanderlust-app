import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostScreen from "../screens/CreatePostScreen";
import HomeScreen from "../screens/HomeScreen";
import LikesScreen from "../screens/LikesScreen";
import OnboardingScreen1 from "../screens/OnboardingScreen1";
import OnboardingScreen2 from "../screens/OnboardingScreen2";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import Splash from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
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
        <Stack.Screen name="Recover" component={Recover} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
