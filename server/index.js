const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

const RoomManager = require("./room_manager");
const main_room_manager = new RoomManager(io)

server.listen(5000, () => {
  console.log('listening on *:5000');
});