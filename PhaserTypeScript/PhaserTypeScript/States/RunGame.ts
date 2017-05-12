module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        playerID: any = null;
        public playerList = new Array();

        //trying shit
        style: any;
        text: any;
        tween: any;

        create()
        {
            console.log("spelet är igång");
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;

            for (var i = 1; i <= Global.numberOfPlayers; i++)   // added Global.numberOfPlayers
            {
                this.playerList[i] = new Player(this.game, 900, (100 + (i * 130)));
            }
            this.setEventHandlers();
            console.log("AKTIVT SPLERUM=== " + Global.prototype.PlayerData.activeGameRoom);
        }

        update()
        {
            console.log("Player ID:" +  this.playerID);
            if (this.playerID != null)
            {
                this.Movement(this.playerList[this.playerID]); //Errror här men nu fixad?
            }
        }

        Movement(player: Player)
        {
            player.body.velocity.x = 0;
            if (player.cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            }
            else if (player.cursors.right.isDown) {
                player.body.velocity.x = 150;
                player.animations.play('left');
            }
            else if (player.cursors.down.isDown) {
                player.body.velocity.y = 150;
                player.animations.play('left');
            }
            else if (player.cursors.up.isDown) {
                player.body.velocity.y = -150;
                player.animations.play('left');
            }
            else {
                player.animations.stop();
                player.frame = 0;
            }
            this.BroadCastPlayerCoordinates(player);
        }

        EventSetMyPlayerID(data)
        {
            this.playerID = data;
        }

        EventNewPlayer(data)
        {
            console.log("FUNKAAARRRRRRRR NY SPELAREEEE");
        }

        EventUpdateCoordinates(data)
        {
            console.log("coords from player recived n updated, cordS:" + data);
            var id, x, y;
            id = data.player;
            x = data.x;
            y = data.y;
            this.playerList[id].x = x;
            this.playerList[id].y = y;
        }

        BroadCastPlayerCoordinates(player: Player) {

            if (!((player.x == player.lastXPosition) && (player.y == player.lastYPosition)))
            { 
                var x = player.body.position.x;
                var y = player.body.position.y;
                Global.socket.emit('playerMoved', { x: x, y: y, player: this.playerID, gameRoom: Global.prototype.PlayerData.activeGameRoom });
                console.log("coords sent");
            }
            player.lastXPosition = player.x;
            player.lastYPosition = player.y;
        }

        //trying shit
        WaitingForPlayersText() {
            this.style = { font: "64px Elephant", fill: "red" };
            this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Waiting For Players", this.style);
            //this.tween = this.add.tween(this.text).to({ alpha: 0 }, 1500,
                //Phaser.Easing.Linear.None, true, 0, 1000, true);
        }

        //trying shit
        RemoveWaitingForPlayersText() {
            this.style = { font: "64px Elephant", fill: "red" };
            this.text.destroy();
            //this.tween.destroy();
        }

        setEventHandlers()
        {
            console.log("event handler set");
            Global.socket.on('TotalConnections', (data) => this.EventSetMyPlayerID(data));
            Global.socket.on('newPlayer', (data) => this.EventNewPlayer(data));
            Global.socket.on('updateCoords', (data) => this.EventUpdateCoordinates(data));
            //Call
            Global.socket.emit('HowManyTotalConnections', null);
            //trying shit
            Global.socket.on('WaitingForPlayersText', () => this.WaitingForPlayersText());
            Global.socket.on('RemoveWaitingForPlayersText', () => this.RemoveWaitingForPlayersText());
        }

    }
}