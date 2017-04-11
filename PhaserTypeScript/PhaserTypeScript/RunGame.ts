module JungleHunter {
    export class RunGame extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: JungleHunter.Player;
        platforms: Phaser.Group;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            this.player = new Player(this.game, 130, 200, "1");
            console.log("i run game");
        }
    }
}