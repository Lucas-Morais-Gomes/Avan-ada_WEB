const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const appRoutes = require('./routes/app');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');
const productRoutes = require('./routes/product');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/node-angular-dois', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Log para todas as requisições
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);
app.use('/products', productRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('Requisição não encontrada, retornando página principal.');
  return res.render('index');
});

module.exports = app;
