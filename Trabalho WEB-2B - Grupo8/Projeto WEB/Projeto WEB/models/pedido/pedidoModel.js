const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const produtoModel = require('../produto/produtoModel');

var pedidoSchema = new Schema ({
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

    produto : {
        type: mongoose.Schema.Types.ObjectId,
         ref: produtoModel
     } 
});

module.exports = mongoose.model('Pedido', pedidoSchema);