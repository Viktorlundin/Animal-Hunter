module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        playerID: any = null;
        mobID: any = null;
        public playerList = new Array();
        public mobslist = new Array();
        firebuttondown: boolean = false;
        i: number;
       
        create()
        {
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.disableVisibilityChange = true;
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            this.mobslist = new Array();

            for (var i = 1; i <= Global.numberOfPlayers; i++)   // added Global.numberOfPlayers
            {
                this.playerList[i] = new Player(this.game, 900, (100 + (i * 130)));
            }

            for (var i = 1; i < Global.numberOfPlayers + 1; i++) {
                this.playerList[i].weapon = this.add.weapon(30, 'bullet');
                this.playerList[i].weapon.trackRotation = false;
                this.playerList[i].weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                this.playerList[i].weapon.bulletSpeed = 2000;
                this.playerList[i].weapon.fireRate = 70;
                this.playerList[i].weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.playerList[i].playerWeaponsLists[i].push(this.playerList[i].weapon);
                this.playerList[i].playerWeaponsLists[i][0].trackSprite(this.playerList[i].playerWeaponSprite, -20, 0, true);  
            }
            
            this.setEventHandlers();
        }

        update() {
            if (this.playerID != null) {
                this.Movement(this.playerList[this.playerID]);

                for (var i = 1; i < Global.numberOfPlayers + 1; i++) {
                    this.playerList[i].playerWeaponSprite.body.position.x = this.playerList[i].x - 500; //vapnet följer efter spelaren
                    this.playerList[i].playerWeaponSprite.body.position.y = this.playerList[i].y - 370;
                    this.playerList[i].playerWeaponSprite.bringToTop();
                }   
            }

            for (this.i = 0; this.i < this.mobslist.length; this.i++)
            {
                for (var j = 1; j < Global.numberOfPlayers + 1; j++) {
                    if (this.physics.arcade.overlap(this.playerList[j].weapon.bullets, this.mobslist[this.i], null, null, this)) {
                        this.playerList[j].totalKills++;
                        console.log(this.playerList[j].totalKills);
                        this.mobslist[this.i].kill();
                        delete this.mobslist[this.i];
                    }  
                }
            }    
        }

        GameOver() {
            for (var j = 1; j < Global.numberOfPlayers + 1; j++) {
                console.log(this.playerList[j].totalKills);
                this.state.states['GameOver'].playerscore = this.playerList[j].totalKills;
            }  
            Global.socket.emit('GameOver', Global.prototype.PlayerData.activeGameRoom);
            console.log("Skickar gameover till server");
        }

        Movement(player: Player)
        {
            this.firebuttondown = false;
            player.body.velocity.x = 0;

            if (player.fireButton.isDown) {
                player.weapon.trackRotation = false;
                player.weapon.fireAngle = Phaser.ANGLE_LEFT;
                player.weapon.fire();
                this.firebuttondown = true;
            }
            if (player.cursors.left.isDown) {
                player.body.velocity.x = -300;
                player.animations.play('left');
            }
            else if (player.cursors.right.isDown) {
                player.body.velocity.x = 300;
                player.animations.play('left');
            }
            else if (player.cursors.down.isDown) {
                player.body.velocity.y = 300;
                player.animations.play('left');
            }
            else if (player.cursors.up.isDown) {
                player.body.velocity.y = -300;
                player.animations.play('left');
            }
            else {
                player.animations.stop();
                player.frame = 0;
            }
            this.BroadCastPlayerCoordinates(player);
        }

        MovementMob(mob: mob1)
        {
            this.BroadCastMobCoordinates(mob);
        }

        EventSetMyPlayerID(data)
        {
            this.playerID = data;
        }

        EventSpawnMob(data)
        {
            var mob = new mob1(this.game, 1, data.y);
            mob.events.onOutOfBounds.add(this.GameOver, this);
            mob.id = data.z;
            this.mobslist.push(mob);
        }

        EventUpdateCoordinates(data)
        {
            var id, x, y, downornot;
            downornot = data.gun;
            id = data.player;
            x = data.x;
            y = data.y;
            if (downornot) {
                console.log("A player is firing his/her weapon");
                this.playerList[id].weapon.trackRotation = false;
                this.playerList[id].weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.playerList[id].weapon.fire();
            }
            if (this.playerList[id].x == x && this.playerList[id].y == y) {
                this.playerList[id].animations.stop();
            }
            else {
                this.playerList[id].animations.play('left');
            }
            this.playerList[id].x = x;
            this.playerList[id].y = y;
        
            
        }

        EventUpdateMobCoordinates(data) {

            var id, x;
            id = data.mob;
            x = data.x;
  
            this.mobslist[id].x = x;
            
        }

        EventGameOver(data) {
        Global.socket.removeAllListeners('Mob');
        Global.socket.off('Mob');
        delete this.mobslist;
        console.log("gameover");
        this.game.state.start('GameOver', true, false);

        }

        BroadCastMobCoordinates(mob: mob1) {

            if (!((mob.x == mob.lastXPosition))) {
                var x = mob.body.position.x;
                Global.socket.emit('mobMoved', { x: x, mob: this.mobID, gameRoom: Global.prototype.PlayerData.activeGameRoom });
            }
            mob.lastXPosition = mob.x;           
        }

        BroadCastPlayerCoordinates(player: Player) {

            if ((!((player.x == player.lastXPosition) && (player.y == player.lastYPosition))) || this.firebuttondown == true)
            { 
                var downornot = this.firebuttondown;
                var x = player.body.position.x;
                var y = player.body.position.y;
                Global.socket.emit('playerMoved', {gun: downornot, x: x, y: y, player: this.playerID, gameRoom: Global.prototype.PlayerData.activeGameRoom });
            }
            player.lastXPosition = player.x;
            player.lastYPosition = player.y;
        }

        setEventHandlers()
        {
            
            Global.socket.on('TotalConnections', (data) => this.EventSetMyPlayerID(data));       
            Global.socket.on('updateCoords', (data) => this.EventUpdateCoordinates(data));
            Global.socket.on('updateMobCoords', (data) => this.EventUpdateMobCoordinates(data));
            Global.socket.on('Mob', (data) => this.EventSpawnMob(data));
            Global.socket.on('GameOver', (data) => this.EventGameOver(data));
            //Call
            Global.socket.emit('HowManyTotalConnections', null);
            Global.socket.emit('StartGame', Global.prototype.PlayerData.activeGameRoom);
        }

    }
}