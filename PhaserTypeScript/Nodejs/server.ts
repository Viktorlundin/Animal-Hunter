//importera och skapa moduler
//http & express, webserver
//var express: any = require('express');
//var app: any = express();
//var server: any = require('http').createServer(app);
//socket.io
//var io: any = require('socket.io')(server);

//path för att hitta filväg utan säkerhetsproblem för servern(för att hitta index.html i annan map)
//var path = require('path');


//Allt i denna mappen localhost:port/includes är public för den som besöker hemsidan,
//där kan vi lägga jquery libary etc.
//app.use(express.static(__dirname + '/../PhaserTypeScript/'));

////Skickar hemsidan index.html när någon besöker hemsidan.
//app.get('/', function (req, res, next)
//{
//    res.sendFile(path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
//});

 //Lysnar på trafik på port 1337

//socket.io server

class SocketServer
{
    express: any = require('express');
    app: any = this.express();
    server: any = require('http').createServer(this.app);
    io: any = require('socket.io')(this.server);
    path = require('path');


    constructor() { }

    StartWebserver(): any {
        this.app.use(this.express.static(__dirname + '/../PhaserTypeScript/'));
        this.app.get('/', function (req, res, next) {
            res.sendFile(this.path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
        });
        this.server.listen(1337);
        console.log("Server started");
    }

        /*CLIENT SIDAN:
        function movePlayer () {
        socket.emit ('player move', {map: 4, coords: '0.0'});
     }
    
        socket.on ('updatePlayer', function (msg) {
      console.log ('A player moves on map ' + msg.map + ' on coords ' + msg.coords);
        });
*/
    setEventHandlers(): any {
        this.io.on("connection", function (client) {
            console.log("New player has connected: " + client.id);
            client.emit('yourID', client.id);
            console.log("Player ID sent");
            client.broadcast.emit('newPlayer', client.id);

            client.on('playerMoved', function (data) {
                console.log(client.id + "x:" + data.x + " y:" + data.y);
                client.broadcast.emit('updateCoordinates', { x: data.x, y: data.y, player: client.id });
            });


            //client.on("move player", onMovePlayer);
            //client.on("disconnect", onClientDisconnect);
            //client.on("place bomb", onPlaceBomb);
            //client.on("register map", onRegisterMap);
            //client.on("start game on server", onStartGame);
            //client.on("ready for round", onReadyForRound);
            //client.on("powerup overlap", onPowerupOverlap);

            //client.on("enter lobby", Lobby.onEnterLobby);
            //client.on("host game", Lobby.onHostGame);
            //client.on("select stage", Lobby.onStageSelect);
            //client.on("enter pending game", Lobby.onEnterPendingGame);
            //client.on("leave pending game", Lobby.onLeavePendingGame);
        });
    }

}


let SS = new SocketServer();
SS.setEventHandlers();
SS.StartWebserver();



//// sending to sender-client only
//socket.emit('message', "this is a test");

//// sending to all clients, include sender
//io.emit('message', "this is a test");

//// sending to all clients except sender
//socket.broadcast.emit('message', "this is a test");

//// sending to all clients in 'game' room(channel) except sender
//socket.broadcast.to('game').emit('message', 'nice game');

//// sending to all clients in 'game' room(channel), include sender
//io.in('game').emit('message', 'cool game');

//// sending to sender client, only if they are in 'game' room(channel)
//socket.to('game').emit('message', 'enjoy the game');

//// sending to all clients in namespace 'myNamespace', include sender
//io.of('myNamespace').emit('message', 'gg');

//// sending to individual socketid
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');