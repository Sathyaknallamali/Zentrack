import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function HabitTracker({ habits, onToggleHabit }) {
  return (
    <View>
      <Text style={styles.label}>Habits:</Text>
      {Object.keys(habits).map((h) => (
        <View key={h} style={styles.row}>
          <CheckBox value={habits[h]} onValueChange={() => onToggleHabit(h)} />
          <Text style={styles.text}>{h}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 18, marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  text: { marginLeft: 10 }
});
