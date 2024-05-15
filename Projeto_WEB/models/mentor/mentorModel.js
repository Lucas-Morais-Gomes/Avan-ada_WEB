const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subjectModel = require('../subject/subjectModel');

var mentorSchema = new Schema({
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

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: subjectModel
    }
});

module.exports = mongoose.model('Mentor', mentorSchema);