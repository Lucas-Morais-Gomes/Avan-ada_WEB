const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('User', Userschema);
