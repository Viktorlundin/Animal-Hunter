

class SocketServer
{
    express: any = require('express');
    app: any = this.express();
    server: any = require('http').createServer(this.app);
    io: any = require('socket.io')(this.server);
    path = require('path');
    activeConnections: number = 0;
    db = require('mongodb').MongoClient;

    constructor()
    {

        // Connect to the db
        this.db.connect("mongodb://localhost:27017/JungleHunter", function (err, db) {
            if (!err) {
                console.log("Connected to MongoDB");
            }
        });

    }

    StartWebserver(): any {
        this.app.use(this.express.static(__dirname + '/../PhaserTypeScript/'));
        this.app.get('/', function (req, res, next) {
            res.sendFile(this.path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
        });
        this.server.listen(1337);
        console.log("Server started");
    }

    EventConnection(client)
    {
        console.log("New player has connected: " + client.id);
        this.activeConnections++;
        console.log("ActiveConnections: " + this.activeConnections)
        client.broadcast.emit('newPlayer', client.id); //id + anslutningnrr
        //Sätt lyssna funktioner för denna klient
        client.on('playerMoved', (data) => this.EventPlayerMoved(data, client));
        client.on('disconnect', () => this.EventDisconnected(client));
        client.on('HowManyTotalConnections', () => this.EventHowManyConnections(client));
        client.on('CanIRegister', (msg) => this.EventCanIRegister(msg, client));
        client.on('CanILogin', (msg) => this.EventCanIRegister(msg, client));
    }

    EventPlayerMoved(data, client)
    {
        client.broadcast.emit('updateCoordinates', { x: data.x, y: data.y, player: data.player });
    }

    EventDisconnected(client)
    {
        console.log('user disconnect');
        this.activeConnections--;
        client.broadcast.emit('user disconnected' + client.id);
        console.log("ActiveConnections: " + this.activeConnections)
    }

    EventHowManyConnections(client)
    {
        console.log('Total connections sent');
        client.emit('TotalConnections', this.activeConnections);
    }

    EventCanIRegister(msg, client)
    {
        var collection = this.db.collection('accounts');
        var newPlayerDoc =
            {
                email: msg.email,
                password: msg.password,
                username: msg.username
            }

        collection.insert(newPlayerDoc);
    }

    EventCanILogin(msg, client)
    {

    }

    

    setEventHandlers(): any {
        this.io.on("connection", (client) => this.EventConnection(client));
            


          


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