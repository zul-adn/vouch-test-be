const mongoose = require('mongoose');
const { Schema } = mongoose;

var ChatSchema = new Schema({
  username: String,
  roomID: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;