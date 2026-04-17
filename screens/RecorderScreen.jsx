import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Audio } from 'expo-av';  


const RecorderScreens = () => {
const [isRecording, setIsRecording] = useState(false);
const [permissionResponse, requestPermission] = Audio.usePermissions();


async function handleRecordingPress() {
    try {
      
      if (permissionResponse?.status !== 'granted') {
        const response = await requestPermission();
        if (response.status !== 'granted') {
          alert('¡Necesitamos el micro! - Metete en los ajustes de tu movil de Expo, y activa el micro ');
          return; 
        }
      }
      setIsRecording(!isRecording);
      console.log('Permiso ok, grabando:', !isRecording);
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
   <TouchableOpacity style={styles.recordButton} onPress={handleRecordingPress}>
      <FontAwesome name="microphone" size={32} color="white" />
      <Text style={styles.recordButtonText}>{isRecording ? "Parar" : "Grabar"}</Text>
    </TouchableOpacity>
  </View>
 <View style={styles.audioSection}>
  <View style={styles.audioHeader}>
    <Text style={styles.audioTitle}>Audios</Text>
    <FontAwesome name="trash-o" size={24} color="white" />
  </View>
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