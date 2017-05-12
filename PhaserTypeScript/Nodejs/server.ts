

class SocketServer
{
    express: any = require('express');
    app: any = this.express();
    server: any = require('http').createServer(this.app);
    io: any = require('socket.io')(this.server);
    path = require('path');
    activeConnections: number = 0;
    gameRooms: any = new Array();
    MongoClient = require('mongodb').MongoClient;
    alreadyloggedin: any = 0;
    TotalConnectionList: string[];
    

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
        //Sätt lyssna funktioner för denna klient
        client.on('playerMoved', (data) => this.EventPlayerMoved(data, client));
        client.on('disconnect', () => this.EventDisconnected(client));
        client.on('HowManyTotalConnections', () => this.EventHowManyConnections(client));
        client.on('CanIRegister', (msg) => this.EventCanIRegister(msg, client));
        client.on('CanILogin', (msg) => this.EventCanILogin(msg, client));
        client.on('joinRoom', (msg) => this.EventJoinRoom(msg, client));
        client.on('createRoom', (msg) => this.EventCreateRoom(msg, client));
        client.on('EmitGameRoomList', (msg) => this.EventEmitGameRoomList(msg, client));
    }

    EventJoinRoom(data, client)
    {
        console.log("joining room:" + data.room);
        client.join(data.room);
        client['myRoom'] = data.room;
    }

    EventCreateRoom(data, client)
    {
        console.log("rum: " + data.room);
        client.join(data.room);
        client['myRoom'] = data.room;
        this.gameRooms.push(data.room);
    }

    EventRemoveGame(data, client)
    {
        //this.gameRooms = this.gameRooms.filter(function (e) { return e !== data.room }) //Tar bort ett rum från arrayen
    }

    EventEmitGameRoomList(data, client)
    {
        //this.gameRooms[0] = "hej"; this.gameRooms[1] = "bo";
        client.emit('GameRoomList', this.gameRooms);
        console.log("GameRoomList har skickats");
    }

    EventPlayerMoved(data, client)
    {
        if (client['myRoom'] != null) {
            var room = client['myRoom'];
            this.io.in(room).emit('updateCoordinates', { x: data.x, y: data.y, player: data.player });
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
        console.log('Total connections sent');
        client.emit('TotalConnections', this.io.sockets.adapter.rooms[client['myRoom']].length);
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
                        collection.insert(playerDoc);
                        console.log("New account registered");
                    }
                }
                );
        });
    }

    CheckTotalConnections(email) {
        for (var x = 0; this.TotalConnectionList.length < x; x++) {
            if (this.TotalConnectionList[x] == email) {
                this.alreadyloggedin = 1;
            }
        }
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


                    this.CheckTotalConnections(doc.email);

                    if(this.alreadyloggedin == 1){
                        this.alreadyloggedin = 0;
                        console.log("Failed login");
                        client.emit('loginfailed', null);
                    }
                    else if (doc) {
                        console.log("Login success");
                        console.log("Username found:" + doc.username);
                        //Sänder logindata, kontoinfo
                        client.id = doc.email; //Sätter clientens id till dess email
                        this.TotalconnectionsList.push(doc.email);
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
//socket.broadcast.to('game').emit('message', 'nice game'); <---------------------

//// sending to all clients in 'game' room(channel), include sender
//io.in('game').emit('message', 'cool game'); <----------------------------------

//// sending to sender client, only if they are in 'game' room(channel)
//socket.to('game').emit('message', 'enjoy the game');  <------------------------

//// sending to all clients in namespace 'myNamespace', include sender
//io.of('myNamespace').emit('message', 'gg');

//// sending to individual socketid
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');