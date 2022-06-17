const express = require('express');
const cors = require('cors');
const path = require('path');
const io = require('socket.io');

app = express();
app.use(cors());
const port = 5000;

const http = require('http').Server(app);


const socket = io(http);

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
        let chatMessage = new Chat({ message: msg.message, username: msg.username, roomID: msg.roomID });
        chatMessage.save();
      });
    });

})


http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
