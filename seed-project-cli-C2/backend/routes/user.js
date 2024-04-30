var express = require("express");
var router = express.Router();

const User = require("../models/user"); // Importe o modelo de usuário

router.post("/", async function (req, res, next) {
  const userObject = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const userSave = await userObject.save();
    console.log(userSave);

    res.status(201).json({
      myMsgSucesso: "Usuário cadastrado com sucesso",
      objUserSave: userSave,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Server-Side: Um erro aconteceu ao salvar o usuário",
      myError: err,
    });
  }
});

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({});

    res.status(200).json({
      myMsgSucesso: "Usuários recuperados com sucesso",
      objUsersRecuperados: users,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Server-Side: Um erro aconteceu ao buscar os usuários",
      myError: err,
    });
  }
});

module.exports = router;
