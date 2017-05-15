
module JungleHunter {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        Hostbutton: Phaser.Button;
        Joinbutton: Phaser.Button;
        LogOutbutton: Phaser.Button;
        playername: any;
        welcomeText: any;
        welcomeTextstyle: any;
        


        create() {
            console.log("Är i main menu nu.");
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.welcomeTextstyle = { font: "36px Elephant", fill: "Green" };
            this.welcomeText = this.add.text(this.game.world.centerX - 300, this.game.world.centerY - 200, "Welcome" + " " + this.playername, this.welcomeTextstyle);
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

    }
}