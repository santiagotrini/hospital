const mongoose = require('mongoose');

// Appointment schema
const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  specialty: {

  }
});

// Appointment model
module.exports = mongoose.model('Appointment', AppointmentSchema);
