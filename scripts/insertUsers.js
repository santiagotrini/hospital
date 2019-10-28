// importar User model
const User     = require('../models/User');
// importar bcrypt y mongoose
const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');

// URI de la db
const db     = process.env.MONGODB_URI || 'mongodb://localhost/hospital';
// usando mongoose.set para sacar algunos deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
// conectarse a la db usando mongoose.connect
// bloques then() y catch() porque el metodo devuelve una promesa
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));


// crear usuarios para testear
// usuario admin
let admin = new User({
  username: 'admin',
  email: 'admin@hospital.com',
  firstName: 'Franco',
  lastName: 'Fortunatto',
  role: 'admin',
  password: '1234',
});

// hashear password y guardar usuario admin
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) throw err;
    admin.password = hash;
    admin.save(err => {
      if (err) return next(err);
    });
  });
});

// usuario alejo (doctor)
let alejo = new User({
  username: 'alejo',
  email: 'alejo@hospital.com',
  firstName: 'Alejo',
  lastName: 'Garcia Misztal',
  role: 'doctor',
  password: '1234',
});

// hashear password y guardar usuario admin
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(alejo.password, salt, (err, hash) => {
    if (err) throw err;
    alejo.password = hash;
    alejo.save(err => {
      if (err) return next(err);
    });
  });
});

// usuario mateo (paciente)
let mateo = new User({
  username: 'mateo',
  email: 'mateo@hospital.com',
  firstName: 'Mateo',
  lastName: 'Ricci',
  role: 'patient',
  password: '1234',
});

// hashear password y guardar usuario admin
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(mateo.password, salt, (err, hash) => {
    if (err) throw err;
    mateo.password = hash;
    mateo.save(err => {
      if (err) return next(err);
    });
  });
});
