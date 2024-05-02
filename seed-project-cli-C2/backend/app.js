const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user'); // Importar a rota do usuário

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Troque isso para a origem do seu cliente
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Permitir apenas esses métodos
};  

app.use(cors(corsOptions)); // Isso permite apenas a origem especificada e os métodos listados

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/node-angular')
  .then(() => {
     console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
//   next();
// });

app.use('/message', messageRoutes);
app.use('/user', userRoutes); // Registrar a rota do usuário

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   return res.render('index');
// });

module.exports = app;
