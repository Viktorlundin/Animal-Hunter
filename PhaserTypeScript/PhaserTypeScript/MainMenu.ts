module JungleHunter {
    export class MainMenu extends Phaser.State {
        create() {
        }

        startGame() {
            this.game.state.start('runGame', true, false)
        }
    }
}