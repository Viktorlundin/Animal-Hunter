
module JungleHunter {
    export class Host extends Phaser.State {
        background: Phaser.Sprite;
        startbutton: Phaser.Button;
        backbutton: Phaser.Button;



        create() {
            console.log("Är i  host menu nu.");
            this.background = this.add.sprite(0, 0, 'Host');
            //this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.startbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'Startgame', this.startGame, this)
            this.backbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 300, 'BackButton', this.GoBack, this)

           

        }

        startGame() {
            this.game.state.start('RunGame', true, false);
        }
        GoBack() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}