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
        playerscore: number;

        create() {
            this.background = this.add.sprite(0, 0, 'defeat');
            this.backbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 300, 'BackButton', this.ReturnToMainMenu, this)
            this.gameovertextstyle = { font: "72px Elephant", fill: "Black" };
            this.gameovertext = this.game.add.text(this.game.world.centerX - 500, this.game.world.centerY - 300, "GAME OVER", this.gameovertextstyle);
            this.updateCookie();
        }

        public setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

        updateCookie() {
            var score = this.getCookie("playerscore");
            this.setCookie("playerscore", "", -1);
            this.playerscore += +score;
            this.setCookie("playerscore", this.playerscore, 365);
        }

        PlayAgain() {
            this.game.state.start('RunGame', true, false);
        }

        ReturnToMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

    }
}

