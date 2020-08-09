"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
//Servidor
const server = app.listen(port, function () {
    console.log("Te escucho por el puerto: ", port);
});
const SocketIO = require("socket.io");
const io = SocketIO(server);
app.use(express.static('client'));
//Socket control de Eventos
io.on("connection", function (socket) {
    console.log("Usuario Conectado", socket.id);
    socket.on("message", function (message, room) {
        console.log(message);
        io.emit('message', message);
    });
    socket.on("typing", function (data) {
        socket.broadcast.emit('typing', data);
    });
    socket.on("disconnect", function () {
        console.log("Usuario Desconectado");
    });
});
//# sourceMappingURL=server.js.map