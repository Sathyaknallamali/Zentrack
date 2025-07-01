import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MoodTracker({ selectedMood, onSelectMood }) {
  const moods = ['😃', '🙂', '😐', '😔', '😭'];
  return (
    <View>
      <Text style={styles.label}>Mood:</Text>
      <View style={styles.row}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => onSelectMood(m)}
            style={[styles.moodBox, selectedMood === m && styles.selected]}>
            <Text style={styles.emoji}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 18, marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  emoji: { fontSize: 28 },
  moodBox: { padding: 10 },
  selected: { backgroundColor: '#d0ebff', borderRadius: 10 }
});
