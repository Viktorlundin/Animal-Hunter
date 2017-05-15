module JungleHunter {
    export class Gun extends Phaser.Sprite {
        weapon; sprite; cursor;


        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'baddie', 0);
            this.weapon = this.game.add.weapon(30, 'bullet');
            this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            this.weapon.bulletSpeed = 600;
            this.weapon.fireRate = 100;
            //Vapnets sprite
            this.sprite = this.add.sprite(400, 300, 'pistol'); this.
            this.sprite.anchor.set(0.5);
            game.physics.arcade.enable(this.sprite);

            this.weapon.trackSprite(this.sprite, -20, 0, true);//Logiska vapnet följer efter spriten
            this.weapon.trackRotation = false;
            this.cursors = this.input.keyboard.createCursorKeys();
        }
    }
}

