import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAudioRecorder, RecordingPresets, AudioModule, setAudioModeAsync } from 'expo-audio';
import StorageService from '../services/StorageService';
import AudioItem from '../components/AudioItem';

const RecorderScreens = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audios, setAudios] = useState([]);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    const loadAudios = async () => {
      const saved = await StorageService.getAudios();
      if (saved) setAudios(saved);
    };
    loadAudios();
  }, []);

  async function handleRecordingPress() {
    try {
      if (!isRecording) {
        const permission = await AudioModule.requestRecordingPermissionsAsync();
        if (!permission.granted) {
          alert('Necesitamos el micro, ve a ajustes > Expo Go > activa el micrófono!');
          return;
        }
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
        setIsRecording(true);
      } else {
        await audioRecorder.stop();
        const uri = audioRecorder.uri;
        const newAudio = { id: Date.now().toString(), uri, duration: '0:00' };
        const updatedAudios = [...audios, newAudio];
        setAudios(updatedAudios);
        await StorageService.saveAudios(updatedAudios);
        setIsRecording(false);
      }
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
          <ScrollView style={styles.audioList}>
            {audios.map((audio) => (
              <AudioItem
                key={audio.id}
                id={audio.id}
                duration={audio.duration}
                onDelete={(id) => {
                  const updated = audios.filter(a => a.id !== id);
                  setAudios(updated);
                  StorageService.saveAudios(updated);
                }}
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