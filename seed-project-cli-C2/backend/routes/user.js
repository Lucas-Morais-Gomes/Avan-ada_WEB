var express = require('express'); 
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const User = require("../models/user");

router.post("/", async (req, res) => {
    try{
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message});
    }
})

router.post("/", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.json({ error: "Erro na senha/email"});
    }

    const eq = bcrypt.compareSync(req.body.password, user.password)
    if(!eq) {
        return res.json({ error: "Erro na senha/email"});
    }

    res.json({sucess: "Login Correto", token: createToken(user)})
})

function createToken(user) {
    const payload = {
        user_id: user._id
    }
    return jwt.sign(payload, 'frase secreta');
}

module.exports = router; 
