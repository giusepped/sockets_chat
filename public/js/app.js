$(document).ready(function(){
  $('.chat').hide();
  $('#name').focus();

  $('.enter-chat').click(function() {
    var name = $('#name').val();
    $('.chat').show();
    $('.username').hide();
    $('#m').focus();

    var socket = io();
    socket.emit('new_user', name);

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('').focus();
      return false;
    });

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });
});

