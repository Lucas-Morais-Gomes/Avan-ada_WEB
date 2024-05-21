const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    message: {type: Schema.Types.ObjectId, ref: 'Message'},
    country: { type: String, required: true }, // Novo campo para país
    gender: { type: String }, // Novo campo para gênero
    acceptTerms: { type: Boolean, default: false } // Novo campo para aceitar termos
});


module.exports = mongoose.model('User', schema);