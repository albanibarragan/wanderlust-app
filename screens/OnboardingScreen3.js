import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { storiesIllustration } from './assets/stories-illustration.png';
const Brujula = require('./assets/brujula-logo.png');

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.containerlogo}>
                <Image source={Brujula} style={styles.Brujula} />
                <Text style={styles.titleBienvenido}>Wanderlust</Text>
            </View>
            <Image source={storiesIllustration} style={styles.storiesIllustration} />
            <Text style={styles.titleBienvenido}>Inspírate con historias de viaje y crea las tuyas</Text>
            <Text style={styles.subtitleBienvenido}>
                Únete a una comunidad de viajeros apasionados. Comparte fotos, consejos y anécdotas de tus aventuras.
            </Text>
            <TouchableHighlight style={styles.buttonArrow}>
             <Text style={styles.arrow}>→</Text>
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
    storiesIllustration: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    containerlogo:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBienvenido: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitleBienvenido: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
    },
    brujula: {
        width: 50,
        height: 50,
    },
    arrow: {
        fontSize: 20,
        color: '#03A9F4',
        fontWeight: 'bold',
     },
     buttonArrow:{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 100,
     }
});
