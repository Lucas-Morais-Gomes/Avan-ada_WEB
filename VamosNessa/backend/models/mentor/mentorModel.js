const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productModel = require('../product/productModel'); // Alteração aqui: Importar o modelo do produto corretamente

const mentorSchema = new Schema({
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
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Alteração aqui: Corrigir a referência ao modelo do produto
    }
});

module.exports = mongoose.model('Mentor', mentorSchema);
