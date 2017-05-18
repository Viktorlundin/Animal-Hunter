module JungleHunter {
    export class mob1 extends Phaser.Sprite {
        public x: number = null;
        public y: number = null;
        public lastXPosition: number = null;
        public id: number = null;
        

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'baddie', 0);
            this.x = x;
            this.y = y;

            this.animations.add('right', [2, 3], 10, true);
            this.game.physics.arcade.enable(this);
            this.checkWorldBounds = true;
            this.body.drag.y = 1000;
            this.game.physics.arcade.enable(this);
            this.game.add.existing(this);
            this.body.velocity.x = 150;
            this.animations.play('right');
        }
    }
}