var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/node-mongodb-mongoose-user", (req, res, next) => {
  res.render("node");
});

router.post("/node-mongodb-moongose-user", async (req, res, next) => {
  var emailVar = req.body.emailBody;
  var userObject = new User({
    firstname: "Iago",
    lastname: "Grilly",
    password: "senha",
    email: emailVar,
  });
  await userObject.save();

  res.redirect("/node-mongodb-mongoose-user");
});

module.exports = router;
