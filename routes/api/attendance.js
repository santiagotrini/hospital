const express     = require('express');
const router      = express.Router();
const Attendance = require('../../models/Attendance');

router.get('/attendances', (req, res, next) => {
  Attendance.find((err, attendances) => {
    if (err) return next(err);
    res.status(200).json(attendances);
  });
});

router.get('/attendance/:id', (req, res, next) => {
  Attendance.findById(req.params.id, (err, attendance) => {
    if (err) return next(err);
    res.status(200).json(attendance);
  });
});

router.post('/attendance', (req, res, next) => {
  const attendance = new Attendance({
    doctor: req.body.doctor,
    sensor: req.body.sensor
  });
  attendance.save((err, attendance) => {
    if (err) return next(err);
    res.status(201).json(attendance);
  });
});

module.exports = router;
