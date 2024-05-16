// teste.js

const axios = require('axios');

const data = {
    firstName: 'Lucas',
    lastName: 'Morais',
    password: '12345',
    email: 'lucas@gmail.com'
};

console.log(data)

axios.post('http://localhost:3000/user/register', data)
    .then(response => {
        console.log('Resposta do servidor:', response.data);
    })
    .catch(error => {
        console.error('Erro ao enviar solicitação:', error);
    });
