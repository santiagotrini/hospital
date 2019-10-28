// Esquema para los documentos de usuario en MongoDB
// El rol por default es paciente

// importar mongoose 
const mongoose = require('mongoose');

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'patient'
  },
  password: {
    type: String,
    required: true
  }
});

// User model
module.exports = mongoose.model('User', UserSchema);
