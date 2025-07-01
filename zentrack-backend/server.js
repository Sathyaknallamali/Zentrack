const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Checkin = require('./models/Checkin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// POST route to save check-in and return suggestions
app.post('/api/checkin', async (req, res) => {
  try {
    const { mood, notes, habits, date } = req.body;

    if (!mood || !date) {
      return res.status(400).json({ error: 'Mood and date are required' });
    }

    const newEntry = new Checkin({ mood, notes, habits, date });
    await newEntry.save();

    // 🔍 Suggestion logic based on mood and note keywords
    const lowerNotes = notes.toLowerCase();
    let suggestion = 'Thanks for checking in! Keep taking care of yourself.';

    if (mood === '😭' || lowerNotes.includes('cry') || lowerNotes.includes('lonely')) {
      suggestion = 'It’s okay to feel down. Try talking to someone you trust or taking a mindful break.';
    } else if (mood === '😔' || lowerNotes.includes('tired') || lowerNotes.includes('stress')) {
      suggestion = 'Consider doing a short breathing exercise or going for a walk.';
    } else if (mood === '😐' || lowerNotes.includes('bored') || lowerNotes.includes('meh')) {
      suggestion = 'Mix up your routine today! Maybe start with a new playlist or 5 minutes of stretching.';
    } else if (mood === '🙂') {
      suggestion = 'You seem okay! Keep up the good habits that support your mental health.';
    } else if (mood === '😃' || lowerNotes.includes('happy') || lowerNotes.includes('excited')) {
      suggestion = 'Awesome! Celebrate this good moment and spread positivity if you can.';
    }

    return res.status(201).json({ message: 'Check-in saved!', suggestion });

  } catch (error) {
    console.error('Error saving check-in:', error);
    res.status(500).json({ error: 'Server error. Check-in could not be saved.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
