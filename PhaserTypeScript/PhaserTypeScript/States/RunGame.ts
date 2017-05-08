module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        playerID: any = null;
        public playerList = new Array();

        create()
        {
            console.log("spelet är igång");
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            //this.platforms = this.add.group();
            //this.platforms.enableBody = true;

            for (var i = 1; i <= Global.numberOfPlayers; i++)   // added Global.numberOfPlayers
            {
                this.playerList[i] = new Player(this.game, 900, (100 + (i * 130)));
            }
            this.setEventHandlers();
            console.log("AKTIVT SPLERUM=== " + Global.prototype.PlayerData.activeGameRoom);
        }

        update()
        {
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

        setEventHandlers()
        {
            console.log("event handler set");

            Global.socket.on('TotalConnections', (data) => this.EventSetMyPlayerID(data));
            Global.socket.on('updateCoordinates', (data) => this.EventUpdateCoordinates(data));
            Global.socket.emit('HowManyTotalConnections', null);
        }

    }
}