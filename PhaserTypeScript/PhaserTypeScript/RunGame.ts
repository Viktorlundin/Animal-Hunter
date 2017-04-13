﻿module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        clientID: any;
        //localSocket = Global.socket;
        //myPlayerID = null;
        //public myPlayerID = new Array();
        public playerOne: JungleHunter.Player;
        public playerTwo: JungleHunter.Player;
        public playerThree: JungleHunter.Player;
        public playerFour: JungleHunter.Player;

        create()
        {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;

            this.playerOne = new Player(this.game, 130, 250);
            this.playerTwo = new Player(this.game, 130, 300);
            this.playerThree = new Player(this.game, 130, 100);
            this.playerFour = new Player(this.game, 130, 200);

            //console.log("MY PLAYER ID:" + Global.myID); //this.myPlayerID
        }

        GetFreePlayer() {
            Global.socket.on('TotalConnections', function (data) {
                console.log('Total connections:' + data);
                Global.myID = data;
                console.log("GLOBAL ID: " + Global.myID);
            });
            Global.socket.emit('HowManyTotalConnections', null);
            //emita
        }

        CallEventHandler()
        {
            //if (Global.myID == null) {

            this.GetFreePlayer();
            this.GetFreePlayer();
                console.log("globid=" + Global.myID);
                if (Global.myID == 1) {
                    console.log("running event handler");
                    this.setEventHandlers(this.playerOne);
                }
                else if (Global.myID == 2) {
                    this.setEventHandlers(this.playerTwo);
                }
                else if (Global.myID == 3) {
                    this.setEventHandlers(this.playerThree);
                }
                else if (Global.myID == 4) {
                    this.setEventHandlers(this.playerFour);
                }
          //  }
        }

        update()
        {
            if (Global.myID == null) {
                //this.GetFreePlayer();
                this.GetFreePlayer();
                console.log("globid=" + Global.myID);
                if (Global.myID == 1) {
                    console.log("running event handler");
                    this.setEventHandlers(this.playerOne);
                }
                else if (Global.myID == 2) {
                    this.setEventHandlers(this.playerTwo);
                }
                else if (Global.myID == 3) {
                    this.setEventHandlers(this.playerThree);
                }
                else if (Global.myID == 4) {
                    this.setEventHandlers(this.playerFour);
                }
            }
            //if (this.clientID != null)
           // {
                if (Global.myID == 1)
                    this.Movement(this.playerOne);
                else if (Global.myID == 2)
                    this.Movement(this.playerTwo);
                else if (Global.myID == 3)
                    this.Movement(this.playerThree);
                else if (Global.myID == 4)
                    this.Movement(this.playerFour);
            //}
        }

        Movement(playerMe: Player)
        {
            playerMe.body.velocity.x = 0;
            if (playerMe.cursors.left.isDown) {
                playerMe.body.velocity.x = -150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.right.isDown) {
                playerMe.body.velocity.x = 150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.down.isDown) {
                playerMe.body.velocity.y = 150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.up.isDown) {
                playerMe.body.velocity.y = -150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else {
                playerMe.animations.stop();
                playerMe.frame = 0;
            }
        }

        setEventHandlers(playerMe: Player) //Player behövs endast för att kunna sätta players id
        {
            console.log("event handler set");
            Global.socket.on('yourID', function (data) {
                //Global.myID = data;
                playerMe.id = data;
                console.log("MIN ID AR NU:" + playerMe.id);// + this.playerMe.id
                //this.playerList.push(new Player(this.game, 130, 200, data));
                
                //vår player.id = data;

            });



            Global.socket.on('newPlayer', function (data) {//data = id
                console.log("NY SPELARE FUNKAR");
                //this.player = new Player(this.game, 130, 200, "lol");
                //this.playerList.push(new Player(this.game, 130, 200, "kek"));
                //this.playerList.push(new Player(this.game, 130, 200, data));
                //this.playerList.push(new Player(this.game, 130, 200, data));//error
                //new player(data); data är playerns ID
                //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
            });

            Global.socket.on('updateCoordinates', function (data) {
                console.log("NY KORDINAT");
                var id, x, y;
                id = data.player;
                x = data.x;
                y = data.y;
                console.log("HÄMTAD KORDINAT:" + x + " " + y + " " + id);
                //coordinates: data, player: client.id
                //Set coordinates where player.id = player
            });
        }

    }
}