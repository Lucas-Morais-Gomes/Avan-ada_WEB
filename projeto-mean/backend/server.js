const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/projeto-mean')
  .then(() => {
      console.log('Conectado ao MongoDB');
  }).catch(err => {
      console.error('Erro ao conectar ao MongoDB', err);
  });

// Importar rotas
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Usar rotas
app.use(productRoutes);
app.use(supplierRoutes);
app.use(orderRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando com Nodemon');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
