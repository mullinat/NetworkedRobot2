var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/ttyACM0', {
  parser: serialport.parsers.raw
});
app.get('/', function(req, res){
  res.sendfile('index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    if (msg == "FORWARD"){
      port.write('W');
    }
    if (msg == "BACKWARD"){
      port.write('S');
    }
    if (msg == "LEFT"){
      port.write('A');
    }
    if (msg == "RIGHT"){
      port.write('D');
    }
    if (msg == "STOP"){
      port.write('Q');
    }

  });
});

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/


http.listen(8000, function(){
  console.log('listening on *:8000');
});
