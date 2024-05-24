const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const fornecedorModel = require('../fornecedor/fornecedorModel');


var produtoSchema = new Schema({
    id: {

    },
    caractertica:{

    },
    name: {
        type: String,
        required: true
    },

    field: {
        type: String,
        required: true
    },
    fornecedor: {
        type: mongoose.Schema.Types.ObjectId,
         ref: fornecedorModel
    },
});

module.exports = mongoose.model('Produto', produtoSchema);