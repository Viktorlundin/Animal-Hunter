var SocketServer = (function () {
    function SocketServer() {
        this.express = require('express');
        this.app = this.express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.path = require('path');
        this.activeConnections = 0;
        this.db = require('mongodb').MongoClient;
        // Connect to the db
        this.db.connect("mongodb://localhost:27017/exampleDb", function (err, db) {
            if (!err) {
                console.log("We are connected");
            }
        });
    }
    SocketServer.prototype.StartWebserver = function () {
        this.app.use(this.express.static(__dirname + '/../PhaserTypeScript/'));
        this.app.get('/', function (req, res, next) {
            res.sendFile(this.path.resolve(__dirname + '/../PhaserTypeScript/index.html'));
        });
        this.server.listen(1337);
        console.log("Server started");
    };
    SocketServer.prototype.EventConnection = function (client) {
        var _this = this;
        console.log("New player has connected: " + client.id);
        this.activeConnections++;
        console.log("ActiveConnections: " + this.activeConnections);
        client.broadcast.emit('newPlayer', client.id); //id + anslutningnrr
        //Sätt lyssna funktioner för denna klient
        client.on('playerMoved', function (data) { return _this.EventPlayerMoved(data, client); });
        client.on('disconnect', function () { return _this.EventDisconnected(client); });
        client.on('HowManyTotalConnections', function () { return _this.EventHowManyConnections(client); });
        client.on('CanIRegister', function (msg) { return _this.EventCanIRegister(msg, client); });
        client.on('CanILogin', function (msg) { return _this.EventCanIRegister(msg, client); });
    };
    SocketServer.prototype.EventPlayerMoved = function (data, client) {
        client.broadcast.emit('updateCoordinates', { x: data.x, y: data.y, player: data.player });
    };
    SocketServer.prototype.EventDisconnected = function (client) {
        console.log('user disconnect');
        this.activeConnections--;
        client.broadcast.emit('user disconnected' + client.id);
        console.log("ActiveConnections: " + this.activeConnections);
    };
    SocketServer.prototype.EventHowManyConnections = function (client) {
        console.log('Total connections sent');
        client.emit('TotalConnections', this.activeConnections);
    };
    SocketServer.prototype.EventCanIRegister = function (msg, client) {
        var collection = this.db.collection('test');
        var doc1 = { 'Email': msg.email }; //password, username etc?
        //var doc2 = { 'hello': 'doc2' };
        //var lotsOfDocs = [{ 'hello': 'doc3' }, { 'hello': 'doc4' }];
        collection.insert(doc1);
        //collection.insert(doc2, { w: 1 }, function (err, result) { });
        //collection.insert(lotsOfDocs, { w: 1 }, function (err, result) { });
    };
    SocketServer.prototype.EventCanILogin = function (msg, client) {
    };
    SocketServer.prototype.setEventHandlers = function () {
        var _this = this;
        this.io.on("connection", function (client) { return _this.EventConnection(client); });
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
    };
    return SocketServer;
}());
var SS = new SocketServer();
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
//# sourceMappingURL=server.js.map