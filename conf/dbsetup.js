const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

// const url = 'mongodb://localhost:27017/node-chat';
const url = 'mongodb+srv://zul:zuk@cluster0.jqwzfe7.mongodb.net/?retryWrites=true&w=majority';

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
