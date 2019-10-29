const mongoose = require('mongoose');

// Attendance schema
const AttendanceSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: new Date(),
    required: true
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  }
});

// Attendance model
module.exports = mongoose.model('Attendance', AttendanceSchema);
