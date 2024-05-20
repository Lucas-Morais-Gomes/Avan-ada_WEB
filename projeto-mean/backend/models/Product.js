const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }] // Array de IDs de fornecedores
});

module.exports = mongoose.model('Product', productSchema);
