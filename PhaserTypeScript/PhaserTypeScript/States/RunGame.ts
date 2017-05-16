module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        playerID: any = null;
        public playerList = new Array();
        public mobslist = new Array();
        playerWeaponSprite = new Array();
        playerWeaponsLists = new Array();
        fireButton;
        weapon: any;
        i: number;
        gameover: boolean = false;

        create()
        {
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;

            for (var i = 1; i < 5; i++)
                this.playerWeaponsLists[i] = new Array();

            for (var i = 1; i < Global.numberOfPlayers+1; i++)//Sätt så varje spelare får ett sprite objekt som är vapnet
            {
                var sprite = this.add.sprite(400, 300, 'pistol');
                sprite.anchor.set(0.5);
                this.physics.arcade.enable(sprite);
                this.playerWeaponSprite[i] = sprite; 
            }

            for (var i = 1; i < Global.numberOfPlayers+1; i++)
            {
                this.weapon = this.add.weapon(30, 'bullet');
                this.weapon.trackRotation = false;
                this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                this.weapon.bulletSpeed = 2000;
                this.weapon.fireRate = 70;
                this.weapon.trackRotation = false;
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;

                this.playerWeaponsLists[i].push(this.weapon);
                this.playerWeaponsLists[i][0].trackSprite(this.playerWeaponSprite[i], -20, 0, true);
            }
            var cursors = this.input.keyboard.createCursorKeys();

            this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR); //bara en knapp
            for (var i = 1; i <= Global.numberOfPlayers; i++)   // added Global.numberOfPlayers
            {
                this.playerList[i] = new Player(this.game, 900, (100 + (i * 130)));
            }
            
            this.setEventHandlers();
        }

        update() {
            if (this.playerID != null) {
                this.Movement(this.playerList[this.playerID]);

                for (var i = 1; i < Global.numberOfPlayers + 1; i++) {
                    this.playerWeaponSprite[i].body.position.x = this.playerList[i].x - 500; //vapnet följer efter spelaren
                    this.playerWeaponSprite[i].body.position.y = this.playerList[i].y - 370;
                    this.playerWeaponSprite[i].bringToTop();

                }
            }
            if (this.fireButton.isDown) {
                
                this.playerWeaponsLists[this.playerID][0].trackRotation = false;
                this.playerWeaponsLists[this.playerID][0].fireAngle = Phaser.ANGLE_LEFT;
                this.playerWeaponsLists[this.playerID][0].fire();
                
            }

            for (this.i = 0; this.i < this.mobslist.length; this.i++)
            {
                if (this.physics.arcade.overlap(this.weapon.bullets, this.mobslist[this.i], null, null, this))
                {
                    this.mobslist[this.i].kill();
                }
                if (this.mobslist[this.i].outOfBoundsKill) {
                    this.GameOver();
                }  
            }    
        }

        //public GameOver(){
        //    this.game.state.start('GameOver', true, false);
        //}

        Movement(player: Player)
        {
            player.body.velocity.x = 0;
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
            mob.id = data.z;
            this.mobslist.push(mob);
        }

        EventUpdateCoordinates(data)
        {
            
            var id, x, y;
            id = data.player;
            x = data.x;
            y = data.y;
            this.playerList[id].x = x;
            this.playerList[id].y = y;
        }

        EventUpdateMobCoordinates(data) {

            var id, x;
            id = data.mob;
            x = data.x;
  
            this.mobslist[id].x = x;
            
        }

        BroadCastMobCoordinates(mob: mob1) {

            if (!((mob.x == mob.lastXPosition))) {
                var x = mob.body.position.x;
                Global.socket.emit('mobMoved', { x: x, mob: mob.id, gameRoom: Global.prototype.PlayerData.activeGameRoom });
            }
            mob.lastXPosition = mob.x;
            
        }

        BroadCastPlayerCoordinates(player: Player) {

            if (!((player.x == player.lastXPosition) && (player.y == player.lastYPosition)))
            { 
                var x = player.body.position.x;
                var y = player.body.position.y;
                Global.socket.emit('playerMoved', { x: x, y: y, player: this.playerID, gameRoom: Global.prototype.PlayerData.activeGameRoom });
                
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
            //Call
            Global.socket.emit('HowManyTotalConnections', null);
            Global.socket.emit('StartGame', Global.prototype.PlayerData.activeGameRoom);
        }

    }
}