import { Image, StyleSheet, Text, View } from 'react-native';
import Brujula from '../assets/brujula-logo.png';

export default function HeaderWanderlust(){
    return(
        <View style={styles.header}>
            <Image source={Brujula} style={styles.brujula} />
            <Text style={styles.title}>Wanderlust</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        gap: 2,
        paddingHorizontal: 10,
        paddingTop: 10,
    },  
    brujula: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
      },
});
