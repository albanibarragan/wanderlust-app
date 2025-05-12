import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Brujula from '../assets/brujula-logo.png';

export default function HeaderWanderlust() {
  const handleNotificationPress = () => {
    console.log('Notificaciones presionadas');
    // Aquí puedes navegar a la pantalla de notificaciones si lo deseas
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={Brujula} style={styles.brujula} />
        <Text style={styles.title}>Wanderlust</Text>
      </View>
      <TouchableOpacity onPress={handleNotificationPress} style={styles.bellButton}>
        <Icon name="bell" size={24} color="#0FA3E2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brujula: {
    width: 55,
    height: 55,
  },
  title: {
    fontSize: 20,
    color: "#0FA3E2",
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bellButton: {
    padding: 8,
  },
});