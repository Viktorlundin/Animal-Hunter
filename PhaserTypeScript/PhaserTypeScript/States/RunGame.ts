module JungleHunter
{
    export class RunGame extends Phaser.State
    {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        platforms: Phaser.Group;
        playerID: any = null;
        public playerList = new Array();
        playerWeaponSprite = new Array();
        playerWeaponsLists = new Array();
        fireButton;
        mobs: any;


        Bullet = function (game, key) {
            Phaser.Sprite.call(this, game, 0, 0, key);

            this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.physics.arcade.enable(this.Bullet);
            this.anchor.set(0.5);

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.exists = false;

            this.tracking = false;
            this.scaleSpeed = 0;
        };

        

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

                var weapon = this.add.weapon(30, 'bullet');
                weapon.trackRotation = false;
                weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                weapon.bulletSpeed = 2000;
                weapon.fireRate = 700;
                weapon.trackRotation = false;
                weapon.fireAngle = Phaser.ANGLE_LEFT;

                this.playerWeaponsLists[i].push(weapon);
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

        update()
        {
            if (this.playerID != null)
            {
                this.Movement(this.playerList[this.playerID]);

                for (var i = 1; i < Global.numberOfPlayers+1; i++)
                {       
                    this.playerWeaponSprite[i].body.position.x = this.playerList[i].x - 500; //vapnet följer efter spelaren
                    this.playerWeaponSprite[i].body.position.y = this.playerList[i].y - 370;
                    this.playerWeaponSprite[i].bringToTop();
                   
                }
            }
            if (this.fireButton.isDown)
            {
                this.playerWeaponsLists[this.playerID][0].trackRotation = false;
                this.playerWeaponsLists[this.playerID][0].fireAngle = Phaser.ANGLE_LEFT;
                this.playerWeaponsLists[this.playerID][0].fire();
            }


            this.physics.arcade.overlap(this.playerList[this.playerID], this.mobs, this.after_collision, null, this); 
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

        after_collision() {
            console.log("Killing a mob");
            this.mobs.kill();
        }

        EventSetMyPlayerID(data)
        {
            this.playerID = data;
        }

        EventNewPlayer(data)
        {
           
        }

        EventSpawnMob(data)
        {
            //this.mob = new mob1(this.game, 1, data.y);
            this.mobs = this.add.group();
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
            Global.socket.on('newPlayer', (data) => this.EventNewPlayer(data));
            Global.socket.on('updateCoords', (data) => this.EventUpdateCoordinates(data));
            Global.socket.on('Mob', (data) => this.EventSpawnMob(data));
            //Call
            Global.socket.emit('HowManyTotalConnections', null);
            Global.socket.emit('StartGame', Global.prototype.PlayerData.activeGameRoom);
        }

    }
}