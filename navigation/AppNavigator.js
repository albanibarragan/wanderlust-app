import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen1 from "../screens/OnboardingScreen1";
import OnboardingScreen2 from "../screens/OnboardingScreen2";
import Splash from "../screens/SplashScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Recover from "../screens/Recover";
import RecoverPassword from "../screens/RecoverPassword";

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
