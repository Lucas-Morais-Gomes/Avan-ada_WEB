const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mentorModel = require('../mentor/mentorModel');

var studentSchema = new Schema ({
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

    mentor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: mentorModel
    }
});

module.exports = mongoose.model('Student', studentSchema);