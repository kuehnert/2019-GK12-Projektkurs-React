const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/textdb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  res.send('Hallo Welt!');
});

app.get('/people', (request, response) => {
  const data = db.getAll();
  const jsonData = JSON.stringify(data);
  response.send(jsonData);
});

app.get('/people/:id', (request, response) => {
  const data = db.getById(request.params.id);
  const jsonData = JSON.stringify(data);
  response.send(jsonData);
});

app.post('/people', (request, response) => {
  const data = request.body;
  db.create(data);
  response.send("Super");
});

app.listen(5000, () => console.log('Server läuft auf Port 5000!'));
