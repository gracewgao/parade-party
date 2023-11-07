const express = require('express');
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 8080

var app = express();
const server = http.createServer(app)
const io = socket(server)

io.on('connection', function (socket) {
    console.log("hello");
    // socket.on('joined', function () {
    //     console.log(' joined');
    // });
    // socket.on('disconnect', function () {
    //     console.log(' disconnected');
    // }); 
});

server.listen(port);
console.log('Connected');