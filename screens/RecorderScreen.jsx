import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming 
} from 'react-native-reanimated';
import AudioItem from '../components/AudioItem';

const RecorderScreens = () => {
  const [isRecording, setIsRecording] = useState(false);
  // ponemos unos audios de ejemplo:
  const [audios, setAudios] = useState([
  { id: '1', duration: '0:23' },
  { id: '2', duration: '1:05' },
  { id: '3', duration: '0:47' },
]);

  return (
    <>
   <View style={styles.container}>
  <View style={styles.header}>
    <Text style={styles.title}>JoseRecorder</Text>
    <TouchableOpacity>
      <Ionicons name="moon-sharp" size={24} color="white" />
    </TouchableOpacity>
  </View>

  <View style={styles.recorderSection}>
    <TouchableOpacity style={styles.recordButton} onPress={() => setIsRecording(!isRecording)}>
      <FontAwesome name="microphone" size={32} color="white" />
      <Text style={styles.recordButtonText}>{isRecording ? "Parar" : "Grabar"}</Text>
    </TouchableOpacity>
  </View>

 <View style={styles.audioSection}>
  
  {/* Header: Audios + papelera separados */}
  <View style={styles.audioHeader}>
    <Text style={styles.audioTitle}>Audios</Text>
    <FontAwesome name="trash-o" size={24} color="white" />
  </View>

  {/* Lista de audios FUERA del header */}
  <ScrollView style={styles.audioList}>
    {audios.map((audio) => (
      <AudioItem
        key={audio.id}
        id={audio.id}
        duration={audio.duration}
        onDelete={(id) => setAudios(audios.filter(a => a.id !== id))}
      />
    ))}
  </ScrollView>

  </View>
    </View>

      </>
  )
}

export default RecorderScreens

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  audioList: {
  marginTop: 15,
},
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  recorderSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    backgroundColor: '#c0392b',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recordButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  audioSection: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 250,
  },
  audioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
})