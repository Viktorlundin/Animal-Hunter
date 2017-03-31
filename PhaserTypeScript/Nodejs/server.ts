//importera och skapa moduler
//http & express, webserver
var express: any = require('express');
var app: any = express();
var server: any = require('http').createServer(app);
//socket.io
var io: any = require('socket.io')(server);

//path för att hitta filväg utan säkerhetsproblem för servern(för att hitta index.html i annan map)
var path = require('path');


//Allt i denna mappen localhost:port/includes är public för den som besöker hemsidan,
//där kan vi lägga jquery libary etc.
app.use(express.static(__dirname + '/../'));

//Skickar hemsidan index.html när någon besöker hemsidan.
app.get('/', function (req, res, next)
{
    res.sendFile(path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
});

server.listen(1337); //Lysnar på trafik på port 1337