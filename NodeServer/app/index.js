const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(socket.id, 'a user connected');
  socket.emit("event", "get_name");
  
  // disconnection

  socket.on('disconnect', () => {
    console.log(socket.id, 'user disconnected');
  });

  // inputs

  socket.on('identifier', (data) => {
    console.log(socket.id, data);
  });



  // test
  socket.on('test', (data) => {
    console.log(socket.id, data);
  }); 

});


server.listen(2200, () => {
  console.log("server started");
})