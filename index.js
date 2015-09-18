var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
var users = {};

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.send(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  socket.on('new_user', function(name){
    users[socket.id] = name;

    socket.emit('chat message', 'welcome, ' + users[socket.id] + ' you are connected');
    socket.broadcast.emit('chat message', users[socket.id] + ' is connected');

    socket.on('disconnect', function() {
      console.log('user disconnected');
      socket.broadcast.emit('chat message', users[socket.id] + ' disconnected');
      delete users[socket.id];
    });

    socket.on('chat message', function(msg){
      io.emit('chat message', users[socket.id] + ': ' + msg);
    });
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});