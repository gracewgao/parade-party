const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { generateSlug } = require("random-word-slugs");
const { Server, Socket } = require("socket.io");
require("dotenv").config();

const io = new Server(server, {
  path: "/parade/",
  cors: {
    origin: process.env.APP_URL,
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
app.use(cors());

// same interface as client
interface User {
  id: string;
  screenSize: number;
  spriteId: number;
}

const socketMap = new Map<string, User[]>();

const updateClients = (paradeId: string) => {
  io.to(paradeId).emit("update", {
    timestamp: new Date().getTime(),
    clients: socketMap.get(paradeId),
  });
};

io.on("connection", (socket: typeof Socket) => {
  socket.on("newParade", () => {
    const paradeId = generateSlug();
    socket.join(paradeId);
    socketMap.set(paradeId, []);
    socket.emit("paradeCreate", paradeId);
    console.log("new parade created " + paradeId);
  });

  socket.on("join", (paradeId: string) => {
    socket.join(paradeId);
    console.log("joined " + paradeId);
  });

  // when a user connects or resized window
  socket.on("userUpdate", (paradeId: string, user: User) => {
    console.log("update: " + paradeId + " " + user.id);
    if (!socketMap.has(paradeId)) {
      // invalid id
      socket.to(paradeId).emit("invalidId");
    } else {
      let isNew = true;
      let connectedUsers = socketMap.get(paradeId) ?? [];
      connectedUsers.forEach((it: User) => {
        if (it.id == user.id) {
          isNew = false;
          it.screenSize = user.screenSize;
        }
      });
      if (isNew) {
        connectedUsers.push({ ...user });
      }
      socketMap.set(paradeId, connectedUsers);
      updateClients(paradeId);
    }
  });

  socket.on("userDisconnect", (paradeId: string, userId: string) => {
    console.log("disconnected: " + paradeId + " " + userId);
    let connectedUsers = socketMap.get(paradeId) ?? [];
    const disconnectedUserIndex = connectedUsers.findIndex(
      (user) => user.id == userId
    );
    connectedUsers.splice(disconnectedUserIndex, 1);
    if (connectedUsers.length == 0) {
      socketMap.delete(paradeId);
    } else {
      socketMap.set(paradeId, connectedUsers);
    }
    updateClients(paradeId);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
