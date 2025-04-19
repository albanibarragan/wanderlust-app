import { Image, StyleSheet, Text, View } from 'react-native';
import Brujula from '../assets/brujula-logo.png';
import { Bell } from 'lucide-react-native';

export default function HeaderWanderlust() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={Brujula} style={styles.brujula} />
        <Text style={styles.title}>Wanderlust</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  },
});

