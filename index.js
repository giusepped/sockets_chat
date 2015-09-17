var app = require('express')();
var http = require('http').Server(app);
var express = require('express');

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.send(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});