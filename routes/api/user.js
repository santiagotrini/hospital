const express = require('express');
const router  = express.Router();
const User    = require('../../models/User');
const bcrypt  = require('bcrypt');

router.get('/users', (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.status(200).json(users);
  });
});

router.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.status(200).json(user);
  });
});

router.post('/user', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    password: req.body.password
  });
  // hashear password y guardar usuario
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save((err, user) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    });
  });
});

module.exports = router;
