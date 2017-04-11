module JungleHunter {
    export class Preloader extends Phaser.State {
        preload() {
            this.load.image('jungle', 'Jungle.png');
            this.load.image('ground', 'platform.png');
            this.load.image('baddie', 'baddie.png');
            this.load.image('bullet', 'bullet.png');
            this.load.spritesheet('dude', 'dude.png', 32, 48);
        }

        create() {

        }
        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}