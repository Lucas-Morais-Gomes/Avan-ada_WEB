const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('Produto', produtoSchema);