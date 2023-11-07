// import express from 'express';
// import http from 'http';
// import { Server, Socket } from 'socket.io';

// const app = express();
// const server = http.createServer();
// const io = new Server(server);
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

/*
// client connects -> update state
  client emits (server screen size)
  (server send new total screen)
  server emits ("update", {timeStamp: X, parade: [{id: X, screenSize: X}...]})
  client on ("update", () => {calculate pos w timestamp, update screen index})

// server detects disconnect -> update state
  server pops array
  server emits update
*/
interface User {
  id: string;
  screenSize: number;
  spriteId: number;
}
let connectedUsers: User[] = [];

const updateClients = () => {
  io.emit("update", {
    timestamp: new Date().getTime(),
    clients: connectedUsers,
  });
};

io.on("connection", (socket: typeof Socket) => {

  // when a user connects or resized window
  socket.on("userUpdate", (user: User) => {
    let isNew = true;
    connectedUsers.forEach((it) => {
      if (it.id == user.id) {
        isNew = false;
        it.screenSize = user.screenSize;
      }
    });
    if (isNew) {
      connectedUsers.push({ ...user });
    }
    updateClients();
  });

  socket.on("userDisconnect", (userId: string) => {
    const disconnectedUserIndex = connectedUsers.findIndex(
      (user) => user.id == userId
    );
    connectedUsers.splice(disconnectedUserIndex, 1);
    updateClients();
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
