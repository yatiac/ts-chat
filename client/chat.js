const socket = io()
//Elementos
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let room = document.getElementById('room');
let log = document.getElementById('log');

log.addEventListener('click',function (){
    socket.emit('username',{
        username: username.value
    })
});

btn.addEventListener('click',function (){
    socket.emit('message',{
        message: message.value,
        username: username.value
    })
});

message.addEventListener('keypress', function(){
    socket.emit('typing', username.value)
});

socket.on('message', function(message){
    actions.innerHTML = '';
    console.log('message');
    output.innerHTML += `<p>
        <strong> ${message.username} </strong>: ${message.message}
    </p>`
});
socket.on('typing', function(data){
    actions.innerHTML = `<p><em>${data} esta escribiendo...</em></p>`
});