const express = require('express');
const cors = require('cors');
const io = require('socket.io');

var app = express();
app.use(cors())

var server = app.listen(5000, function(){
    console.log("App Run on 5000")
})

const socket = io(server);

// DB Conn
const connect = require('./conf/Dbsetup');
const Chat = require('./model/Chatschema');


socket.on('connection', (socket) => {
  console.log('user connected');

  socket.on("join-room", room =>{
    socket.join(room.room)
    console.log("join room "+room.room)
})

socket.on('message', ({nama, message, room}) => {
  
    socket.to(room).emit("message",{
        nama,
        message,
    });

    connect.then((db) => {
        let chatMessage = new Chat({ message: message, username: nama, roomID: room });
        chatMessage.save();
      });
    });

})



