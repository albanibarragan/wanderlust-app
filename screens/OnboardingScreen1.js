import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
const Logo = require('./assets/logo-app-movil.png');

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:  {
    width: 323,         
    height: 128,
    resizeMode: 'contain',
  },
});
