import  useState  from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

export default function CreateTravelPostScreen() {
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) {
      alert('Por favor, escribe algo sobre tu experiencia.');
      return;
    }

    console.log('📍 Post:', {
      título: title || '(Sin título)',
      contenido: content,
    });

    setTitle('');
    setContent('');
    setShowTitle(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <BackButton title="Nuevo Post" />

        {!showTitle && (
          <TouchableOpacity
            onPress={() => setShowTitle(true)}
            style={styles.addTitleButton}
          >
            <AntDesign name="pluscircleo" size={20} color="#555" />
            <Text style={styles.addTitleText}>Agregar título</Text>
          </TouchableOpacity>
        )}

        {showTitle && (
          <TextInput
            style={styles.titleInput}
            placeholder="Título (opcional)"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#aaa"
          />
        )}

        <TextInput
          style={styles.contentInput}
          placeholder="Escribe sobre tu viaje..."
          value={content}
          onChangeText={setContent}
          multiline
          placeholderTextColor="#999"
        />

        {/* Opciones multimedia */}
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionIcon}>
            <Ionicons name="image-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionIcon}>
            <Ionicons name="videocam-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionIcon}>
            <Entypo name="location-pin" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionIcon}>
            <MaterialIcons name="emoji-emotions" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addTitleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addTitleText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    textAlignVertical: 'top',
    height: 180,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionIcon: {
    padding: 8,
  },
  postButton: {
    backgroundColor: '#ff5a3d',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});