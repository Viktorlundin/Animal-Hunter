module JungleHunter {
    export class GameOver extends Phaser.State {
        background: Phaser.Sprite;
        gobackbutton: Phaser.Button;
        playername: any;
        gameoverText: any;
        gameoverTextstyle: any;

        create() {
            this.background = this.add.sprite(0, 0, 'defeat');
            this.gameoverTextstyle = { font: "72px Elephant", fill: "Black" };
            this.gameoverText = this.add.text(this.game.world.centerX - 300, this.game.world.centerY - 200, "Game Over" , this.gameoverTextstyle);
            this.gobackbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'BackButton', this.Goback, this)
        }

        Goback() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}