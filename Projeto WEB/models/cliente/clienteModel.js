const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const fornecedorModel = require('../fornecedor/fornecedorModel');

var clienteSchema = new Schema ({
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
    // ,

    // fornecedor : {
    //     type: mongoose.Schema.Types.ObjectId,
    //      ref: fornecedorModel
    //  } 
});

module.exports = mongoose.model('Cliente', clienteSchema);