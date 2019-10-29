const express     = require('express');
const router      = express.Router();
const Sensor = require('../../models/Sensor');

router.get('/sensors', (req, res, next) => {
  Sensor.find((err, sensors) => {
    if (err) return next(err);
    res.status(200).json(sensors);
  });
});

router.get('/sensor/:id', (req, res, next) => {
  Sensor.findById(req.params.id, (err, sensor) => {
    if (err) return next(err);
    res.status(200).json(sensor);
  });
});

router.post('/sensor', (req, res, next) => {
  const sensor = new Sensor({
    type: req.body.type,
    location: req.body.location
  });
  sensor.save((err, sensor) => {
    if (err) return next(err);
    res.status(201).json(sensor);
  });
});

module.exports = router;
