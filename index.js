var fs = require('fs');
//var Questions = JSON.parse(fs.readFileSync('Questions.json', 'utf8'));
//var Answers = JSON.parse(fs.readFileSync('Answers.json', 'utf8'));
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
const spawn = require('child_process').spawn;

function readJoke(saying) {
    spawn('espeak', ['"' + saying + '"', '/usr'], function(err, data) {
        if (err) return console.error(err);
        console.log(data.toString());
    });
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function say(saying) {
    spawn('say', ['"' + saying + '"', '']);
}

var port = new SerialPort('/dev/ttyUSB1', {
    parser: serialport.parsers.raw
});
app.get('/', function(req, res) {
    res.sendfile('index.html');
});
io.on('connection', function(socket) {
    //console.log('a user connected');
    socket.on('disconnect', function() {
        //console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        if (msg.charAt(0) == 's') {
            io.emit('chat message', "The Robot Said " + msg.substring(1, msg.length));
        } else {
            io.emit('chat message', "The Current State Of The Robot is " + msg);
        }
        switch (msg) {
            case "FORWARD":
                port.write('W');
                break;
            case "BACKWARD":
                port.write('S');
                break;
            case "LEFT":
                port.write('A');
                break;
            case "RIGHT":
                port.write('D');
                break;
            case "STOP":
                port.write('Q');
                break;
            case "SayJoke":
                jokeNum = randomInt(0, Questions.length);
                say(Questions[jokeNum]);
                break;
            case "SayPunchLine":
                say(Answers[jokeNum]);
                break;
            default:
                say(msg.substring(1, msg.length));
                break;
        }

    });
});



http.listen(8000, function() {
    console.log('listening on *:8000');
});
