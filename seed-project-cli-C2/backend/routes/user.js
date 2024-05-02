// user.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Rota para registrar um novo usuário
router.post("/signup", async (req, res) => {
    try {
        console.log("Recebida requisição para registrar um novo usuário");
        console.log(req.body)

        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!req.body.email || !req.body.password || !req.body.country || !req.body.gender) {
            console.error("Campos obrigatórios ausentes: Email, senha, país ou gênero");
            return res.status(400).json({ error: "Email, senha, país e gênero são obrigatórios" });
        }

        // Verificar se o usuário já existe no banco de dados
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.error("Este email já está em uso:", req.body.email);
            return res.status(400).json({ error: "Este email já está em uso" });
        }

        // Criptografar a senha antes de salvar no banco de dados
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        // Criar o novo usuário no banco de dados
        const newUser = await User.create(req.body);
        console.log("Novo usuário registrado com sucesso:", newUser.email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Erro ao registrar novo usuário:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// Rota para fazer login
router.post("/signin", async (req, res) => {
    try {
        console.log("Recebida requisição para fazer login");
        console.log(req.body)

        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!req.body.email || !req.body.password) {
            console.error("Campos obrigatórios ausentes: Email ou senha");
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        // Verificar se o usuário existe no banco de dados
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.error("Usuário não encontrado:", req.body.email);
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Criar e enviar o token de autenticação
        const token = createToken(user);
        console.log("Login bem-sucedido para o usuário:", user.email);
        res.json({ success: "Login bem-sucedido", token: token });
        } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        res.status(500).json({ error: error.message });
        }
});

// Função para criar o token JWT
function createToken(user) {
    const payload = {
        user_id: user._id
    };
    return jwt.sign(payload, 'frase secreta', { expiresIn: '1h' });
}

module.exports = router;
