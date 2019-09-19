const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const users = {};
const rooms = [];




//Setting up a socket with the user "connection" for new sockets
io.on("connection", socket => {
    
    socket.on("join", (nameInput, room) =>{
       
        
        socket.join(room);
        users[socket.id] = nameInput;
        rooms[socket.id] = room;

        socket.emit('update', nameInput+" have conneted ");

        socket.broadcast.in(room).emit('update', nameInput + ' has join the room');
        
    });
     

    //Here we listen on a new user called "chat message"
    socket.on("chat message", (data, room) =>{
        
       io.sockets.in(room).emit('chat message', users[socket.id], data);

    });

    socket.on('disconnect', () => {
        socket.broadcast.in(rooms[socket.id]).emit('update', users[socket.id] + ' has left the room');
        delete users[socket.id]
      })
    

 
});



server.listen(port, () => console.log(`Listening on port ${port}`));