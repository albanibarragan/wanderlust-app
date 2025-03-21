import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Brujula from '../assets/brujula-logo.png';


export default function OnboardingScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={Brujula} style={styles.logo}/>
      <Text style={styles.titleBienvenido}>Bienvenido</Text>
      <Text style={styles.subtitleBienvenido}>
        Estamos emocionados por que compartas tus experiencias y recuerdos de tus viajes.
      </Text>
      <TouchableHighlight style={styles.buttonLetsGo} onPress={() => navigation.navigate('OnboardingScreen2')}> 
        <Text style={styles.textVamos}>Vamos</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0FA3E2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleBienvenido:  {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitleBienvenido:  {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  textVamos:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonLetsGo:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: 295,
    height:52, 
    justifyContent: 'center',
    alignItems: 'center',
  }
});
