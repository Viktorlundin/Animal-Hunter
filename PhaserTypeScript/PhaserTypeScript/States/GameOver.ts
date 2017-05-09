module JungleHunter {
    export class GameOver extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        backbutton: Phaser.Button;
        playerID: any = null;
        public playerList = new Array();
        public mobsList = new Array();
        gameovertext: any;
        gameovertextstyle: any;

        create() {
            this.background = this.add.sprite(0, 0, 'defeat');
            this.backbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 300, 'BackButton', this.ReturnToMainMenu, this)
            this.gameovertextstyle = { font: "72px Elephant", fill: "Black" };
            this.gameovertext = this.game.add.text(this.game.world.centerX-500, this.game.world.centerY-300, "GAME OVER", this.gameovertextstyle);
        }

        PlayAgain() {
            this.game.state.start('RunGame', true, false);
        }

        ReturnToMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

    }
}

       