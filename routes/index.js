const express = require('express');
const router = express.Router();
const passport = require('passport');

// modelo de asistencias para el dashboard
// o conviene hacer AJAX desde el cliente?
// primero que funcione, despues hablamos de mejores practicas
const Attendance = require('../models/Attendance');

// rutas
// home route
router.get('/', (req, res, next) => {
  res.render('index', { user: req.user });
});

// login route
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});

// logout
router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});

// admin dashboard
router.get('/dashboard', (req, res) => {
  Attendance.find((err, attendances) => {
    res.render('dashboard', { user: req.user, attendances: attendances });
  });
});

module.exports = router;
