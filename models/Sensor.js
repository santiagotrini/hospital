const mongoose = require('mongoose');

// Sensor schema
const SensorSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

// Sensor model
module.exports = mongoose.model('Sensor', SensorSchema);
