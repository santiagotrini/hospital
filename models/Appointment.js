const mongoose = require('mongoose');

// Appointment schema
const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Appointment model
module.exports = mongoose.model('Appointment', AppointmentSchema);
