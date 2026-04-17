import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAudioRecorder, RecordingPresets, AudioModule, setAudioModeAsync } from 'expo-audio';
import StorageService from '../services/StorageService';
import AudioItem from '../components/AudioItem';
import RecordingIndicator from '../components/RecordingIndicator';
import LoadingSpinner from '../components/LoadingSpinner';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { darkTheme, lightTheme } from '../utils/theme';

const RecorderScreens = () => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;
  const [isRecording, setIsRecording] = useState(false);
  const [audios, setAudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const colorValue = useSharedValue(0);

  useEffect(() => {
    colorValue.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []);

  useEffect(() => {
    const loadAudios = async () => {
      setIsLoading(true);
      const saved = await StorageService.getAudios();
      if (saved) setAudios(saved);
      setIsLoading(false);
    };
    loadAudios();
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    color: `rgb(${Math.round(255 - colorValue.value * 63)}, ${Math.round(255 - colorValue.value * 255)}, ${Math.round(255 - colorValue.value * 255)})`,
  }));

  const styles = getStyles(theme);

  const deleteAllAudios = async () => {
    setAudios([]);
    await StorageService.saveAudios([]);
  };

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
        const newAudio = { id: Date.now().toString(), uri };
        const updatedAudios = [newAudio, ...audios];
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
          <Animated.Text style={[styles.title, animatedTitleStyle]}>
            JoseRecorder
          </Animated.Text>
          <TouchableOpacity onPress={() => setIsDark(!isDark)}>
            <Ionicons name={isDark ? "sunny" : "moon-sharp"} size={24} color={theme.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.recorderSection}>
          <TouchableOpacity style={styles.recordButton} onPress={handleRecordingPress}>
            <FontAwesome name="microphone" size={32} color="white" />
            <Text style={styles.recordButtonText}>{isRecording ? "Parar" : "Grabar"}</Text>
          </TouchableOpacity>
          {isRecording && <RecordingIndicator />}
        </View>
        <View style={styles.audioSection}>
          <View style={styles.audioHeader}>
            <Text style={styles.audioTitle}>Audios</Text>
            <TouchableOpacity onPress={deleteAllAudios}>
              <FontAwesome name="trash-o" size={24} color={theme.icon} />
            </TouchableOpacity>
          </View>
          {isLoading || isRecording ? (
            <LoadingSpinner />
          ) : (
            <ScrollView style={styles.audioList}>
              {audios.map((audio) => (
                <AudioItem
                  key={audio.id}
                  id={audio.id}
                  uri={audio.uri}
                  theme={theme}
                  onDelete={(id) => {
                    const updated = audios.filter(a => a.id !== id);
                    setAudios(updated);
                    StorageService.saveAudios(updated);
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  )
}

export default RecorderScreens

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    backgroundColor: theme.audioSection,
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
    color: theme.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
})