import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function App() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [habits, setHabits] = useState({
    sleep: false,
    exercise: false,
    study: false
  });
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.0.233:3001/api/checkin', {
        mood,
        notes,
        habits,
        date: new Date().toISOString()
      });

      const receivedSuggestion = response.data.suggestion || 'Your check-in was saved!';
      setSuggestion(receivedSuggestion);

      // Reset form fields
      setMood('');
      setNotes('');
      setHabits({ sleep: false, exercise: false, study: false });

    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to connect to server.');
    }
  };

  const emojis = ['😃', '🙂', '😐', '😔', '😭'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ZenTrack</Text>

      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.moodRow}>
        {emojis.map((emoji) => (
          <TouchableOpacity
            key={emoji}
            onPress={() => setMood(emoji)}
            style={[
              styles.emojiButton,
              mood === emoji && styles.selectedEmoji
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Write your journal note:</Text>
      <TextInput
        style={styles.input}
        placeholder="Today I feel..."
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.label}>Habits today:</Text>
      {Object.keys(habits).map((habit) => (
        <View key={habit} style={styles.checkboxRow}>
          <CheckBox
            value={habits[habit]}
            onValueChange={() =>
              setHabits({ ...habits, [habit]: !habits[habit] })
            }
          />
          <Text style={styles.checkboxLabel}>
            {habit.charAt(0).toUpperCase() + habit.slice(1)}
          </Text>
        </View>
      ))}

      <Text style={styles.label}>Take a deep breath:</Text>
      <LottieView
        source={require('./assets/breathe.json')}
        autoPlay
        loop
        style={{ height: 140 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Check-In</Text>
      </TouchableOpacity>

      {suggestion ? (
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionTitle}>Today's Suggestion</Text>
          <Text style={styles.suggestionText}>{suggestion}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f9ff',
    flexGrow: 1
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  emojiButton: {
    padding: 10,
    borderRadius: 8
  },
  selectedEmoji: {
    backgroundColor: '#d0f0ff'
  },
  emoji: {
    fontSize: 30
  },
  input: {
    marginTop: 10,
    padding: 10,
    minHeight: 70,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: '#0077cc',
    padding: 15,
    borderRadius: 10,
    marginTop: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  suggestionBox: {
    backgroundColor: '#e6f7f8',
    padding: 15,
    marginTop: 25,
    borderRadius: 10
  },
  suggestionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#00555f'
  },
  suggestionText: {
    fontSize: 16,
    color: '#00454d'
  }
});
