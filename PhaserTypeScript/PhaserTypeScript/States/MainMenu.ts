
module JungleHunter {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        Hostbutton: Phaser.Button;
        Joinbutton: Phaser.Button;
        LogOutbutton: Phaser.Button;
        playername: any;
        playerscore: number = 0;
        welcomeText: any;
        welcomeTextstyle: any;
        rankText: any;
        rankTextstyle: any;
        lifetimekillsText: any;
        lifetimekillsTextstyle: any;
        


        create() {
            console.log("Är i main menu nu.");
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.welcomeTextstyle = { font: "36px Elephant", fill: "Green" };
            this.welcomeText = this.add.text(this.game.world.centerX - 300, this.game.world.centerY - 200, "Welcome" + " " + this.playername, this.welcomeTextstyle);
            this.playerscore = +this.getCookie("playerscore");
            this.rankTextstyle = { font: "22px Elephant", fill: "Black" };
            this.rankText = this.add.text(this.game.world.centerX - 300, this.game.world.centerY - 100, "Rank:" + " " + this.calculateRank(), this.rankTextstyle);
            this.lifetimekillsTextstyle = { font: "22px Elephant", fill: "Black" };
            this.lifetimekillsText = this.add.text(this.game.world.centerX - 300, this.game.world.centerY, "Lifetime kills:" + " " + this.playerscore, this.rankTextstyle);
            this.Hostbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 50, 'HostGameButton', this.HostGame, this);
            this.Joinbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'JoinGameButton', this.JoinGame, this);
            this.LogOutbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'LogOutButton', this.LogOut, this);
           
        }

        calculateRank() {
            var rank;
            if ((this.playerscore <= 50) && (this.playerscore > 1)) {
                rank = "Helt okej";
            }
            else if ((this.playerscore <= 100) && (this.playerscore > 50)) {
                rank = "Inte dålig";
            }
            else if ((this.playerscore <= 150) && (this.playerscore > 100)) {
                rank = "Kunde varit värre";
            }
            else if ((this.playerscore <= 250) && (this.playerscore > 150)) {
                rank = "Cheater";
            }
            else {
                rank = "Sämsta tänkbara";
            }
            return rank;

        }

        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
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