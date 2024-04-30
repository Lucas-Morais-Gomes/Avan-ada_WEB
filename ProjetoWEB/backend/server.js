const express = require('express');
const app = express();
const mongoose = require('mongoose');
var routes = require('./routes/routes');

app.listen(9992, function check(err) {
  if (err) console.log('error');
  else console.log('started');
});

// Conexão com o MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/ProjetoWEB_DB')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

app.use(express.json());
app.use(routes);
