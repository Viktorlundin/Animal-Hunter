module JungleHunter {
    export class Player extends Phaser.Sprite {

        //public id: string;
        //public x: number;
        //public y: number;
        //public cursors: any;

        constructor(game: Phaser.Game, x: number, y: number) {//, id: string
            super(game, x, y, 'dude', 0);
            //this.id = id;
            //this.x = 0;
            //this.y = 0;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.drag.y = 1000;
            //this.game.physics.arcade.enableBody(this);
            this.game.add.existing(this);
        }

        BroadCastCoordinates()
        {
        var x = this.body.position.x;
        var y = this.body.position.y;
        Global.socket.emit('playerMoved', { x: x, y: y, player: null });//PLAYER ID MÅSTE SÄTTAS HÄR
        }

        update() {
            
            this.body.velocity.x = 0;
            //if this player.id = my id (
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
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