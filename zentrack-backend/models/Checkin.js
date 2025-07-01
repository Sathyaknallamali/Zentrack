const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
  mood: String,
  notes: String,
  habits: Object,
  date: String
});

module.exports = mongoose.model('Checkin', CheckinSchema);
