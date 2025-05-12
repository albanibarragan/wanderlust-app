import { Text } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";

export default function App() {

  const [fontsLoaded] = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
});

  if (!fontsLoaded) return null;

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  Text.defaultProps.style = {
    fontFamily: "Roboto-Regular", 
  };

  return <AppNavigator />;
}
