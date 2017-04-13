module JungleHunter {
    export class MainMenu extends Phaser.State {
        create() {
            this.game.state.start('RunGame', true, false);
        }

        startGame() {
            //this.game.state.start('runGame', true, false)
        }
    }
}