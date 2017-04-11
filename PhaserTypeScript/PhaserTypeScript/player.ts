module JungleHunter {
    export class Player extends Phaser.Sprite {

        //public id: string;
        //public x: number;
        //public y: number;
        //public cursors: any;
        cursors = this.game.input.keyboard.createCursorKeys();

        constructor(game: Phaser.Game, x: number, y: number) {//, id: string
            super(game, x, y, 'dude', 0);
            //this.id = id;
            //this.x = 0;
            //this.y = 0;

            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.drag.y = 1000;
            //this.game.physics.arcade.enableBody(this);
            this.game.physics.arcade.enable(this);
            this.game.add.existing(this);
            
        }

        setEventHandlers() {
            Global.socket.on('yourID', function (data) {
                //vår player.id = data;
            });

            Global.socket.on('newPlayer', function (data) {
                var playerID = data;
                //new player(data); data är playerns ID
                //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
            });

            Global.socket.on('updateCoordinates', function (data) {
                var id, x, y;
                id = data.player;
                x = data.x;
                y = data.y;
                //coordinates: data, player: client.id
                //Set coordinates where player.id = player
            });
        }

        BroadCastCoordinates()
        {
        var x = this.body.position.x;
        var y = this.body.position.y;
        Global.socket.emit('playerMoved', { x: x, y: y, player: "lol" });//PLAYER ID MÅSTE SÄTTAS HÄR
        }

        update() {
            
            this.body.velocity.x = 0;
            //if this player.id = my id (
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.up.isDown) {
                this.body.velocity.y = -150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else {
                this.animations.stop();
                this.frame = 0;
            }
        }
    }
}