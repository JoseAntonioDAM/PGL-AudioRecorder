import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const AudioItem = ({ id, duration, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome name="play-circle" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.duration}>0:00 / {duration}</Text>

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
    backgroundColor: '#2a2a2a',
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
    width: '0%',
    height: 4,
    backgroundColor: '#c0392b',
    borderRadius: 2,
  },
  duration: {
    color: 'white',
    fontSize: 12,
  },
});