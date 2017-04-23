module JungleHunter
{
    export class Player extends Phaser.Sprite
    {
        public x: number = null;;
        public y: number = null;
        public lastXPosition: number = null;
        public lastYPosition: number = null;
        public cursors = this.game.input.keyboard.createCursorKeys();

        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'dude', 0);
            this.x = x;
            this.y = y;

            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.drag.y = 1000;
            this.game.physics.arcade.enable(this);
            this.game.add.existing(this);
        }
    }
}