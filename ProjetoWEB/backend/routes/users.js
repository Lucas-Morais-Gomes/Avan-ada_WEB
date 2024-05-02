const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../src/users/users.model");

// Define as rotas de usuário aqui
router.post('/register', async (req, res) => {
    try {
        console.log('Corpo da solicitação:', req.body); // Adiciona um log para verificar o corpo da solicitação
        // Verifica se o corpo da solicitação e o campo de senha estão presentes
        if (!req.body || !req.body.password) {
            throw new Error('Corpo da solicitação inválido ou campo de senha ausente');
        }

        // Criptografa a senha antes de salvar no banco de dados
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        // Cria um novo usuário no banco de dados
        const user = await User.create(req.body);
        
        // Retorna o usuário criado como resposta
        res.json(user);
    } catch (error) {
        // Se ocorrer um erro, envia uma resposta com a mensagem de erro
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
