const mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema = new Schema({
  username: String,
  roomID: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;