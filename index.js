// importar las dependencias (paquetes de npm)
const express  = require('express');
const session  = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// configurar variables de entorno
// como el puerto donde la app escucha o la URI de mongodb
const port   = process.env.PORT        || 3000;
const db     = process.env.MONGODB_URI || 'mongodb://localhost/hospital';
const broker = process.env.BROKER_URI  || 'mqtt://localhost';

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

// crear el objeto app
const app = express();

// lo proximo configura la estrategia local de passport
// para el login con user y password
// es hacer la query a la base de datos y comparar el password con el hash guardado
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) throw err;
      if (!res) return done(null, false);
      else return done(null, user);
    });
  });
}));
// estas dos funciones que siguen estan para crear sesiones
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});

// configurar el motor y carpeta de vistas
// uso pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// setear la carpeta public para servir assets estaticos
app.use(express.static('public'));

// rutas
app.get('/', (req, res, next) => {
  let user = {
    name: 'Juan',
    role: 'doctor',
    email: 'juan@hospital.com'
  };
  res.render('index', { user: null });
});

// poner la app a escuchar peticiones
app.listen(port, () => console.log(`Server listening on port ${port}`));
