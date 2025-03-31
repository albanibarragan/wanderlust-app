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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brujula: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
});

