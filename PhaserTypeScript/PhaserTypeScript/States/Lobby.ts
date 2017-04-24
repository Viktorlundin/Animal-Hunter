
module JungleHunter {
    export class Lobby extends Phaser.State {
        background: Phaser.Sprite;
        startbutton: Phaser.Button;
        backbutton: Phaser.Button;
        LobbyList: string[];
        joinbutton: Phaser.Button;


        create() {
            console.log("Är i  lobby menu nu.");
            this.background = this.add.sprite(0, 0, 'Lobby');
            //this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.startbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'Startgame', this.startGame, this)
            this.backbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 50, 'BackButton', this.GoBack, this)
            this.LobbyList = ["CDog", "Viktor", "Eriko", "Jonathang"];
            this.CheckLobbyList();
            Global.socket.emit('CanIRegister', { email: "joe@goes.se", password: "sanfer123", username: "JungleJontas" });
            Global.socket.emit('CanILogin', { email: "joe@goes.se", password: "sanfer123" });

        }

        startGame() {
            this.game.state.start('RunGame', true, false);
        }
        GoBack() {
            this.game.state.start('MainMenu', true, false);
        }


        CheckLobbyList() {
            for (var i = 0; i < this.LobbyList.length; i++) {
                this.joinbutton = this.game.add.button(this.game.world.centerX-70, this.game.world.centerY, 'EmptyButton', this.startGame, this);
                var text = this.game.add.text(0, 0, this.LobbyList[i], { font: "16px Arial", fill: "#ffffff" });
                this.joinbutton.addChild(text);
            }
        }
    }
}