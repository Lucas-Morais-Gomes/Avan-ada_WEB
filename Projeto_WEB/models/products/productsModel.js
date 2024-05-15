const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    field: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('products', productsSchema);