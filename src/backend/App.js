const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let name, chatRoom;


//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    
    socket.on("join", (nameInput, room) =>{
        name = nameInput;
        chatRoom = room;
        //socket.broadcast.emit('broadcast', nameInput + ' has join the room');
        //socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

        //socket.emit('add-person',name, socket.id);
        //socket.emit("message que", name, data);
    });
     

    //Here we listen on a new namespace called "chat message"
    socket.on("chat message", (data, room) =>{
        
       
       socket.emit('chat message',"   "+name,data);


    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => {
    //socket.emit('remove-person', socket.id);
    console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));