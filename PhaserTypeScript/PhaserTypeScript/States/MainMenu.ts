
module JungleHunter {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        Hostbutton: Phaser.Button;
        Joinbutton: Phaser.Button;
        LogOutbutton: Phaser.Button;
        


        create() {
            console.log("Är i main menu nu.");
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.Hostbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 50, 'HostGameButton', this.HostGame, this)
            this.Joinbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'JoinGameButton', this.JoinGame, this)
            this.LogOutbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'LogOutButton', this.LogOut, this)
        }

        HostGame() {
            this.game.state.start('Host', true, false);
        }
        JoinGame() {
            this.game.state.start('Lobby', true, false);
        }
        LogOut() {
            this.game.state.start('Login', true, false);
        }




        startGame() {
            this.game.state.start('RunGame', true, false);
        }
    }
}