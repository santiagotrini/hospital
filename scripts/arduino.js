// un script para similar un arduino mandando data por mqtt
// posiblemente conectado a un sensor RFID para hacer algo asi como un control de horarios

const mqtt = require('mqtt');
// set true para usar el script con la app en Heroku
let production = false;
const broker = production ? 'mqtt://test.mosquitto.org' : 'mqtt://localhost';
const client = mqtt.connect(broker);
// conectarse al broker y publicar datos cada 2 minutos
// todo hardcodeado porque no tenemos un arduino de verdad
client.on('connect', () => {
    console.log(`Arduino connected to ${broker}`);
    setInterval(() => {
      // publish data to broker every 2 minutes
      const data = {
        sensor: '5db7950ed626940cca4ce2a2', // id del sensor hardcodeado
        doctor: '5db709e68db47f0cc0ca52df'  // id de alejo hardcodeado
      };
      let json = JSON.stringify(data);
      // podria publicar a distintos topicos pero con uno me conformo
      client.publish('attendance-hospital-inet', json);
    }, 120000);
  });
