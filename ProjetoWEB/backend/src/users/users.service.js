var userModel = require('./users.model');
var key = '123456789trytrytry';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
  return new Promise((resolve, reject) => {
    var userModelData = new userModel();

    userModelData.firstName = userDetails.firstName;
    userModelData.lastName = userDetails.lastName;
    userModelData.email = userDetails.email;

    // Encrypting the password before saving it
    var encryptedPassword = encryptor.encrypt(userDetails.password);
    userModelData.password = encryptedPassword;

    userModelData
      .save()
      .then((result) => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};

module.exports.loginUserControllerFn = (userDetails) => {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({ email: userDetails.email })
      .then((result) => {
        if (!result) {
          reject({ status: false, msg: 'Dados de Usuário Inválidos!' });
        } else {
          var decryptedPassword = encryptor.decrypt(result.password);
          if (decryptedPassword === userDetails.password) {
            resolve({ status: true, msg: 'Usuário Logado Com Sucesso!' });
          } else {
            reject({ status: false, msg: 'Usuário ou Senha Inválidos!' });
          }
        }
      })
      .catch((error) => {
        reject({ status: false, msg: 'Erro ao buscar usuário!' });
      });
  });
};
