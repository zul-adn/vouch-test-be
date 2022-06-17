const express = require('express');
const cors = require('cors');
const io = require('socket.io');

var app = express();
app.use(cors())

var server = app.listen(5000, function(){
    console.log("App Run on 5000")
})

const socket = io(server);

// DB Connection
const connect = require('./conf/Dbsetup');
const Chat = require('./model/Chatschema');


//Get data by roomID
app.get('/chat/:roomID', (req, res) => {
  let { roomID  } = req.params;

  connect.then((db) => {
    Chat.find({ roomID: roomID }, (err, data) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
      }
      res.json(data);
    });
  });

});


//check if user exist
app.get('/check/:userName', (req, res) => {
  let { userName } = req.params;

  connect.then((db) => {
    Chat.find({ username: userName }, (err, data) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
      }
      res.json(data.length);
    });
  });

});

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



