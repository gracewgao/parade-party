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
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var generateSlug = require("random-word-slugs").generateSlug;
var _a = require("socket.io"), Server = _a.Server, Socket = _a.Socket;
require("dotenv").config();
var io = new Server(server, {
    path: "/parade/",
    cors: {
        origin: process.env.APP_URL,
        methods: ["GET", "POST"],
    },
});
var cors = require("cors");
app.use(cors());
var socketMap = new Map();
var updateClients = function (paradeId) {
    io.to(paradeId).emit("update", {
        timestamp: new Date().getTime(),
        clients: socketMap.get(paradeId),
    });
};
io.on("connection", function (socket) {
    socket.on("newParade", function () {
        var paradeId = generateSlug();
        socket.join(paradeId);
        socketMap.set(paradeId, []);
        socket.emit("paradeCreate", paradeId);
        console.log("new parade created " + paradeId);
    });
    socket.on("join", function (paradeId) {
        socket.join(paradeId);
        console.log("joined " + paradeId);
    });
    // when a user connects or resized window
    socket.on("userUpdate", function (paradeId, user) {
        var _a;
        console.log("update: " + paradeId + " " + user.id);
        if (!socketMap.has(paradeId)) {
            // invalid id
            socket.emit("invalidId");
        }
        else {
            var isNew_1 = true;
            var connectedUsers = (_a = socketMap.get(paradeId)) !== null && _a !== void 0 ? _a : [];
            connectedUsers.forEach(function (it) {
                if (it.id == user.id) {
                    isNew_1 = false;
                    it.screenSize = user.screenSize;
                }
            });
            if (isNew_1) {
                connectedUsers.push(__assign({}, user));
            }
            socketMap.set(paradeId, connectedUsers);
            updateClients(paradeId);
        }
    });
    socket.on("userDisconnect", function (paradeId, userId) {
        var _a;
        console.log("disconnected: " + paradeId + " " + userId);
        var connectedUsers = (_a = socketMap.get(paradeId)) !== null && _a !== void 0 ? _a : [];
        var disconnectedUserIndex = connectedUsers.findIndex(function (user) { return user.id == userId; });
        connectedUsers.splice(disconnectedUserIndex, 1);
        if (connectedUsers.length == 0) {
            socketMap.delete(paradeId);
        }
        else {
            socketMap.set(paradeId, connectedUsers);
        }
        updateClients(paradeId);
    });
});
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
