var SocketServer = (function () {
    function SocketServer() {
        this.express = require('express');
        this.app = this.express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.path = require('path');
        this.activeConnections = 0;
        this.gameRooms = new Array();
        this.busyRooms = new Array();
        this.MongoClient = require('mongodb').MongoClient;
        this.numnum = 1;
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
        client.on('CanILogin', function (msg) { return _this.EventCanILogin(msg, client); });
        client.on('joinRoom', function (msg) { return _this.EventJoinRoom(msg, client); });
        client.on('createRoom', function (msg) { return _this.EventCreateRoom(msg, client); });
        client.on('EmitGameRoomList', function (msg) { return _this.EventEmitGameRoomList(msg, client); });
        client.on('StartGame', function (room) { return _this.EventStartGame(room); });
        client.on('GameOver', function (room) { return _this.EventGameOver(room); });
        client.on('MyRoomSize', function (msg) { return _this.EventSetRoomSize(msg, client); });
    };
    SocketServer.prototype.EventJoinRoom = function (data, client) {
        console.log("joining room:" + data.room);
        client.join(data.room);
        client.myRoom = data.room;
        this.numnum++;
    };
    SocketServer.prototype.EventCreateRoom = function (data, client) {
        console.log("rum: " + data.room);
        client.join(data.room);
        client.myRoom = data.room;
        this.gameRooms.push(data.room + ' ' + data.numberOfPlayers);
    };
    SocketServer.prototype.EventSetRoomSize = function (data, client) {
        console.log("room size: " + data.myroomsize);
        this.MYRSize = data.myroomsize;
    };
    SocketServer.prototype.EventGameOver = function (room1) {
        var gameover;
        clearInterval(this.TimeInterval);
        var room = room1;
        var clients_in_the_room = this.io.sockets.adapter.rooms[room];
        for (var clientId in clients_in_the_room) {
            var client_socket = this.io.sockets.connected[clientId];
            client_socket.emit('GameOver', { GAMEOVER: gameover });
        }
    };
    SocketServer.prototype.EventStartGame = function (room1) {
        function SpawnMob() {
            var y = Math.floor(Math.random() * (600 - 1 + 1)) + 1;
            var z;
            var room = room1;
            var clients_in_the_room = self.io.sockets.adapter.rooms[room];
            for (var clientId in clients_in_the_room) {
                var client_socket = self.io.sockets.connected[clientId];
                client_socket.emit('Mob', { y: y, mob: z++ });
            }
        }
        function SpawnBOSS() {
            var room = room1;
            var clients_in_the_room = self.io.sockets.adapter.rooms[room];
            for (var clientId in clients_in_the_room) {
                var client_socket = self.io.sockets.connected[clientId];
                var y = Math.floor(Math.random() * (600 - 1 + 1)) + 1;
                console.log("y:" + y);
                client_socket.emit('Mob', { y: y, mob: 'Mob2' });
            }
        }
        var bool = true;
        for (var room in this.busyRooms) {
            if (room == room1) {
                bool = false;
                break;
            }
            else {
                bool = true;
            }
        }
        if (bool) {
            this.busyRooms.push(room1);
            var self = this;
            var levelDifficulty = 2;
            this.TimeInterval = setInterval(SpawnMob, levelDifficulty * 1000);
        }
    };
    SocketServer.prototype.EventEmitGameRoomList = function (data, client) {
        client.emit('GameRoomList', this.gameRooms);
        console.log("GameRoomList har skickats");
    };
    SocketServer.prototype.EventPlayerMoved = function (data, client) {
        if ((client.myRoom != null) && (this.numnum == this.MYRSize)) {
            var room = client.myRoom;
            client.to(room).emit('RemoveWaitingForPlayersText'); //added .to(room)
            var clients_in_the_room = this.io.sockets.adapter.rooms[room];
            for (var clientId in clients_in_the_room) {
                var client_socket = this.io.sockets.connected[clientId];
                if (client.id != client_socket.id)
                    client_socket.emit('updateCoords', { gun: data.gun, x: data.x, y: data.y, player: data.player });
            }
        }
    };
    SocketServer.prototype.EventDisconnected = function (client) {
        console.log('user disconnect');
        this.activeConnections--; //Denna är för alla spelare, inte bara rummets spelare
        client.broadcast.to(client['myRoom']).emit('user disconnected' + client.id);
        console.log("ActiveConnections: " + this.activeConnections);
    };
    SocketServer.prototype.EventHowManyConnections = function (client) {
        client.emit('TotalConnections', Object.keys(this.io.nsps['/'].adapter.rooms[client.myRoom]).length);
    };
    SocketServer.prototype.EventCanIRegister = function (msg, client) {
        this.MongoClient.connect("mongodb://localhost:27017/junglehunter", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('accounts').findOne({
                $and: [
                    {
                        email: msg.email
                    },
                    {
                        password: msg.password
                    }
                ]
            }, function (err, doc) {
                if (err) {
                    return console.dir(err);
                }
                if (doc) {
                    console.log("Cannot register");
                    client.emit('RegisterFailed', null);
                }
                else {
                    var playerDoc = {
                        email: msg.email,
                        password: msg.password,
                        username: msg.username
                    };
                    var collection = db.collection('accounts');
                    collection.insert(playerDoc);
                    console.log("New account registered");
                    client.emit('RegisterSuccessfully', null);
                }
            });
        });
    };
    SocketServer.prototype.EventCanILogin = function (msg, client) {
        console.log("logintry");
        this.MongoClient.connect("mongodb://localhost:27017/junglehunter", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('accounts').findOne({
                $and: [
                    {
                        email: msg.email
                    },
                    {
                        password: msg.password
                    }
                ]
            }, function (err, doc) {
                if (err) {
                    return console.dir(err);
                }
                if (doc) {
                    console.log("Login success");
                    console.log("server username found:" + doc.username);
                    //Sänder logindata, kontoinfo
                    //client.id = doc.email; //Sätter clientens id till dess email
                    client.emit('LoginAccepted', { email: doc.email, password: doc.password, username: doc.username });
                }
                else {
                    console.log("Failed login");
                    client.emit('loginfailed', null);
                }
            });
        });
    };
    SocketServer.prototype.setEventHandlers = function () {
        var _this = this;
        this.io.on("connection", function (client) { return _this.EventConnection(client); });
    };
    return SocketServer;
}());
var SS = new SocketServer();
SS.setEventHandlers();
SS.StartWebserver();
//# sourceMappingURL=server.js.map