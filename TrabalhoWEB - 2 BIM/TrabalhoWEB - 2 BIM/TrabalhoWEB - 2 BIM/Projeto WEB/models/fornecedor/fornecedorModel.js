const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produtoModel = require('../produto/produtoModel');

var fornecedorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema);