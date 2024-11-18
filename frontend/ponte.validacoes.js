const net = require('net');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const JAVA_BRIDGE_HOST = 'localhost';
const JAVA_BRIDGE_PORT = 4000;

app.post('/validar', (req, res) => {
  const { tipoValidacao, valor } = req.body;

  const client = new net.Socket();
  client.connect(JAVA_BRIDGE_PORT, JAVA_BRIDGE_HOST, () => {
    console.log('Connected to Java bridge');
    client.write(`${tipoValidacao},${valor}\n`);
  });

  client.on('data', (data) => {
    console.log('Response from Java bridge:', data.toString());
    res.json({ valido: data.toString().trim() === 'Valido' });
    client.destroy();
  });

  client.on('error', (err) => {
    console.error('Error connecting to Java bridge:', err.message);
    res.status(500).send('Error connecting to Java bridge');
  });

  client.on('close', () => {
    console.log('Connection to Java bridge closed');
  });
});

app.listen(5000, () => {
  console.log('Node.js server listening on port 5000');
});