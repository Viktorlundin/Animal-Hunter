module JungleHunter
{
    export class Player extends Phaser.Sprite
    {
        public x: number = null;
        public y: number = null;
        public lastXPosition: number = null;
        public lastYPosition: number = null;
        public cursors = this.game.input.keyboard.createCursorKeys();
        public fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR); //bara en knapp
        public playerWeaponSprite = Phaser.Sprite.prototype;
        public playerWeaponsLists = new Array();
        public weapon: any;
        public totalKills: number = 0;
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
            
            for (var i = 1; i < 5; i++) {

                this.playerWeaponsLists[i] = new Array();
            }

            var sprite = this.game.add.sprite(400, 300, 'pistol');
            sprite.anchor.set(0.5);
            this.game.physics.arcade.enable(sprite);
            this.playerWeaponSprite = sprite; 
        }
    }
}