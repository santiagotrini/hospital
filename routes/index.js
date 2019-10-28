const express = require('express');
const router = express.Router();
const passport = require('passport');

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
  res.render('dashboard', { user: req.user });
});

module.exports = router;
