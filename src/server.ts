import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
const app = express();
const port = 3000;

//Servidor
const server = app.listen(port, function(){
    console.log("Te escucho por el puerto: ",port);
});

const SocketIO = require("socket.io");
const io = SocketIO(server);


app.use(express.static('client'));


//Socket control de Eventos
io.on("connection", function(socket: any) {
    console.log("Usuario Conectado",socket.id);

    socket.on("message", function(message: any, room: any) {
        console.log(message);
        io.emit('message',message);
    });
    socket.on("typing", function(data: any) {
        socket.broadcast.emit('typing', data);
    });
    socket.on("disconnect", function(){
        console.log("Usuario Desconectado");  
    });


});

