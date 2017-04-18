module JungleHunter {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        startbutton: Phaser.Button;
        tutorialbutton: Phaser.Button;


        create() {
            console.log("Är i main menu nu.");
           
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.startbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'Startgame', this.startGame, this)

 
        }

        startGame() {
            this.game.state.start('RunGame', true, false);
        }
    }
}