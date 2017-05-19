

class SocketServer
{
    express: any = require('express');
    app: any = this.express();
    server: any = require('http').createServer(this.app);
    io: any = require('socket.io')(this.server);
    path = require('path');
    activeConnections: number = 0;
    gameRooms: any = new Array();
    busyRooms: any = new Array();
    MongoClient = require('mongodb').MongoClient;
    TimeInterval: any;
    numOfClientsInRoom;
    MYRSize;
    room;
    numnum = 1;

    constructor()
    {

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
        client.on('CanILogin', (msg) => this.EventCanILogin(msg, client));
        client.on('joinRoom', (msg) => this.EventJoinRoom(msg, client));
        client.on('createRoom', (msg) => this.EventCreateRoom(msg, client));
        client.on('EmitGameRoomList', (msg) => this.EventEmitGameRoomList(msg, client));
        client.on('StartGame', (room) => this.EventStartGame(room));
        client.on('GameOver', (room) => this.EventGameOver(room));
        client.on('MyRoomSize', (msg) => this.EventSetRoomSize(msg, client));
    }

    EventJoinRoom(data, client)
    {
        console.log("joining room:" + data.room);
        client.join(data.room);
        client.myRoom = data.room;
        this.numnum++;
    }

    EventCreateRoom(data, client)
    {
        console.log("rum: " + data.room);
        client.join(data.room);
        client.myRoom = data.room;
        this.gameRooms.push(data.room + ' ' + data.numberOfPlayers);
    }

    EventSetRoomSize(data, client) {
        console.log("room size: " + data.myroomsize);
        this.MYRSize = data.myroomsize;
    }

    EventGameOver(room1) {
        var gameover;
        clearInterval(this.TimeInterval);
        var room = room1;
        var clients_in_the_room = this.io.sockets.adapter.rooms[room];
        for (var clientId in clients_in_the_room) {
            var client_socket = this.io.sockets.connected[clientId];
            client_socket.emit('GameOver', { GAMEOVER: gameover });
        }
        
    }

    EventStartGame(room1)
    {
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
                //setTimeout(SPAWNBOSS, 10 * 1000);

            }
        
       
    }

    EventEmitGameRoomList(data, client)
    {
        client.emit('GameRoomList', this.gameRooms);
        console.log("GameRoomList har skickats");
    }

    EventPlayerMoved(data, client)
    {
        if ((client.myRoom != null) && (this.numnum == this.MYRSize)) {
            var room = client.myRoom;

            client.to(room).emit('RemoveWaitingForPlayersText'); //added .to(room)
            var clients_in_the_room = this.io.sockets.adapter.rooms[room];
            for (var clientId in clients_in_the_room) {
                var client_socket = this.io.sockets.connected[clientId];
                if(client.id != client_socket.id)
                    client_socket.emit('updateCoords', {gun: data.gun, x: data.x, y: data.y, player: data.player });
            }
        }
    }

    EventDisconnected(client)
    {
        console.log('user disconnect');
        this.activeConnections--;//Denna är för alla spelare, inte bara rummets spelare
        client.broadcast.to(client['myRoom']).emit('user disconnected' + client.id);
        console.log("ActiveConnections: " + this.activeConnections)
    }

    EventHowManyConnections(client)
    {
        client.emit('TotalConnections', Object.keys(this.io.nsps['/'].adapter.rooms[client.myRoom]).length);
    }

    EventCanIRegister(msg, client)
    {
        this.MongoClient.connect("mongodb://localhost:27017/junglehunter", function (err, db) {
            if (err) { return console.dir(err); }

            var collection = db.collection('accounts').findOne
                (
                {
                    $and:
                    [
                        {
                            email: msg.email
                        },
                        {
                            password: msg.password
                        }
                    ]
                },
                function (err, doc) {
                    if (err) { return console.dir(err); }
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
                        var collection = db.collection('accounts')
                        collection.insert(playerDoc);
                        console.log("New account registered");
                        client.emit('RegisterSuccessfully', null);
                    }
                }
                );
        });
    }

    EventCanILogin(msg, client)
    {
        console.log("logintry");
        this.MongoClient.connect("mongodb://localhost:27017/junglehunter", function (err, db) {
            if (err) { return console.dir(err); }
            var collection = db.collection('accounts').findOne
                (
               {
                    $and:
                   [
                        {
                            email: msg.email
                        },
                        {
                            password: msg.password
                        }
                   ]
                },    
                function (err, doc) {
                    if (err) { return console.dir(err); }
                    if (doc) {
                        console.log("Login success");
                        console.log("server username found:" + doc.username);
                        //Sänder logindata, kontoinfo
                        //client.id = doc.email; //Sätter clientens id till dess email
                        client.emit('LoginAccepted', { email: doc.email, password: doc.password, username: doc.username });
                        //Skicka data genom doc.mongodb-variabel. Hela kontot finns i doc variabeln.
                    }
                    else {
                        console.log("Failed login");
                        client.emit('loginfailed', null);
                    }
                }
                );
        });
    }

    

    setEventHandlers(): any {
        this.io.on("connection", (client) => this.EventConnection(client));

    }

}


let SS = new SocketServer();
SS.setEventHandlers();
SS.StartWebserver();
