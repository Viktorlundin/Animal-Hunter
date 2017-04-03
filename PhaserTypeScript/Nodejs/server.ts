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
app.use(express.static(__dirname + '/../PhaserTypeScript/'));

//Skickar hemsidan index.html när någon besöker hemsidan.
app.get('/', function (req, res, next)
{
    res.sendFile(path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
});

server.listen(1337); //Lysnar på trafik på port 1337

//socket.io server

class SocketServer
{
    setEventHandlers()
    {
        io.on("connection", function (client)
        {
            console.log("New player has connected: " + client.id);

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


    broadcastingLoop()
    {
        for (var i in game.players)
        {
        }
    }
}

let SS = new SocketServer();

SS.setEventHandlers();
SS.broadcastingLoop();