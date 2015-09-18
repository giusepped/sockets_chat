var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.send(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user is connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});