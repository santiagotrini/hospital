const express     = require('express');
const router      = express.Router();
const Appointment = require('../../models/Appointment');

router.get('/appointments', (req, res, next) => {
  Appointment.find((err, appointments) => {
    if (err) return next(err);
    res.status(200).json(appointments);
  });
});

router.get('/appointment/:id', (req, res, next) => {
  Appointment.findById(req.params.id, (err, appointment) => {
    if (err) return next(err);
    res.status(200).json(appointment);
  });
});

router.post('/appointment', (req, res, next) => {
  console.log(req.body.date, req.body.time);
  const date = new Date();
  const appointment = new Appointment({
    patient: req.body._id,
    date: req.body.date,
    specialty: req.body.specialty,
    doctor: '5db709e68db47f0cc0ca52df' // hardcoded arreglar
  });
  appointment.save((err, appointment) => {
    if (err) return next(err);
    res.status(201).json(appointment); 
  });
});

module.exports = router;
