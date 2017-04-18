
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
            let plugin = new PhaserInput.Plugin(this.game, this.game.plugins);
            this.add.plugin(plugin);
            var input = this.game.add.inputField(10, 90, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Password',
                type: PhaserInput.InputType.password
            });
 
        }

        startGame() {
            this.game.state.start('RunGame', true, false);
        }
    }
}