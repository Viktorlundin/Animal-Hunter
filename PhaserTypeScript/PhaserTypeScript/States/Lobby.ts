
module JungleHunter {
    export class Lobby extends Phaser.State {
        background: Phaser.Sprite;
        backbutton: Phaser.Button;
        LobbyList: string[];
        joinbutton: Phaser.Button;
        text: any;
        style: any;

        create() {
            console.log("Är i  lobby menu nu.");
            this.background = this.add.sprite(0, 0, 'Lobby');
            this.backbutton = this.game.add.button(this.game.world.centerX- 250, this.game.world.centerY, 'BackButton', this.GoBack, this)
            this.LobbyList = ["CDog", "Viktor", "Eriko", "Jonathang"];
            this.style = {font: "32px Elephant", fill: "black"}
            this.text = this.game.add.text(this.game.world.centerX-50, this.game.world.centerY-400, "Available games", this.style)
            this.CheckLobbyList();
        }

        startGame() {
            this.game.state.start('RunGame', true, false);
        }
        GoBack() {
            this.game.state.start('MainMenu', true, false);
        }


        CheckLobbyList() {
            for (var i = 0; i <= this.LobbyList.length - 1; i++) {
                this.joinbutton = this.game.add.button(this.game.world.centerX, 35 + (i * 75), 'EmptyButton', this.startGame, this);
                var text = this.game.add.text(0, 0, this.LobbyList[i] + "s game", { font: "14px Elephant", fill: "black", wordWrap: true, wordWrapWidth: this.joinbutton.width, align: "center" });
                text.anchor.set(-0.20);
                this.joinbutton.addChild(text);
                
            }
        }
    }
}