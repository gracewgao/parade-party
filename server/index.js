// import express from 'express';
// import http from 'http';
// import { Server, Socket } from 'socket.io';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// const app = express();
// const server = http.createServer();
// const io = new Server(server);
var cors = require("cors");
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var _a = require("socket.io"), Server = _a.Server, Socket = _a.Socket;
var io = new Server(server, {
    path: "/parade/",
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
app.use(cors());
var connectedUsers = [];
var roomId = "123";
var updateClients = function () {
    io.emit("update", {
        timestamp: new Date().getTime(),
        clients: connectedUsers,
    });
};
io.on("connection", function (socket) {
    // when a user connects or resized window
    socket.on("userUpdate", function (user) {
        var isNew = true;
        connectedUsers.forEach(function (it) {
            if (it.id == user.id) {
                isNew = false;
                it.screenSize = user.screenSize;
            }
        });
        if (isNew) {
            connectedUsers.push(__assign({}, user));
        }
        updateClients();
    });
    socket.on("userDisconnect", function (userId) {
        var disconnectedUserIndex = connectedUsers.findIndex(function (user) { return user.id == userId; });
        connectedUsers.splice(disconnectedUserIndex, 1);
        updateClients();
    });
});
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
