const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/app'); // Importe o roteador principal

// Conexão com o MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/ProjetoWEB_DB')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

// Use o roteador principal
app.use(router);

// Vincule o roteador de usuários ao prefixo '/user'
app.use("/user", require("./routes/users"));

// Porta em que o servidor vai ouvir
const PORT = 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
