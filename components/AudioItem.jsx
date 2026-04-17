import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import { useEffect } from 'react';

const AudioItem = ({ id, uri, duration, onDelete }) => {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status?.playing ?? false;
  const currentTime = status?.currentTime ?? 0;
  const totalDuration = status?.duration ?? 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) : 0;

const handlePlayPause = async () => {
  if (isPlaying) {
    player.pause();
  } else {
    await setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
    });
    player.play();
  }
};

  useEffect(() => {
  if (status?.didJustFinish) {
    player.seekTo(0);
  }
}, [status?.didJustFinish]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause}>
        <FontAwesome 
          name={isPlaying ? "pause-circle" : "play-circle"} 
          size={28} 
          color="white" 
        />
      </TouchableOpacity>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      <Text style={styles.duration}>
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </Text>

      <TouchableOpacity onPress={() => onDelete(id)}>
        <FontAwesome name="times" size={22} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AudioItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#c0392b',
    borderRadius: 2,
  },
  duration: {
    color: 'white',
    fontSize: 12,
  },
});