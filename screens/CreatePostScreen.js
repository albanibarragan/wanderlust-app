import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWanderlust from '../components/HeaderWanderlust';

export default function CreatePostScreen({ navigation }) {
  return (
    <SafeAreaView  style={styles.container}>
      <HeaderWanderlust />
      <Text>CreatePostScreen</Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});