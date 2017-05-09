module JungleHunter {
    export class Lobby extends Phaser.State {
        background: Phaser.Sprite;
        backbutton: Phaser.Button;
        LobbyList: any[];
        ButtonList: any[];
        //joinbutton: Phaser.Button;
        text: any;
        style: any;

        create() {
            console.log("Är i  lobby menu nu.");
            this.background = this.add.sprite(0, 0, 'Lobby');
            this.backbutton = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY, 'BackButton', this.GoBack, this);
            //this.LobbyList = ["CDog", "VikThor", "3rik", "JoJo"];
            this.style = { font: "32px Elephant", fill: "black" };
            this.text = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY - 400, "Available games", this.style);
            this.ButtonList = new Array();
            this.SetEventHandlers();

        }

        SetEventHandlers() {
            Global.socket.on('GameRoomList', (data) => this.EvenGetLobbyList(data));

            Global.socket.emit('EmitGameRoomList', null);
            console.log("event emitted lobby");
        }

        EvenGetLobbyList(msg) {
            this.LobbyList = msg;
            console.log("LobbyList set");
            this.CheckLobbyList();
        }


        startGame(data) {
            var playerName = String(data.getChildAt(0).text); //den addar "" så gamerum ej hittas, utan stringy blir de body error
            this.JoinRoom(playerName);   //JSON.stringify(data.getChildAt(0).text)
            Global.numberOfPlayers = 2;
            this.game.state.start('RunGame', true, false);
        }
        GoBack() {
            this.game.state.start('MainMenu', true, false);
        }

        JoinRoom(playerName) {

            Global.prototype.PlayerData.activeGameRoom = playerName;
            console.log("playerName ===" + playerName);
            Global.socket.emit('joinRoom', { room: Global.prototype.PlayerData.activeGameRoom });

        }

        LeaveRoom(playerName) {
            Global.socket.leave(playerName);
        }

        CheckLobbyList() {
            for (var i = 0; i <= this.LobbyList.length - 1; i++) {//-1
                var joinbutton = this.game.add.button(this.game.world.centerX, 35 + (i * 75), 'EmptyButton', this.startGame, this);
                var text = this.game.add.text(0, 0, this.LobbyList[i], { font: "14px Elephant", fill: "black", wordWrap: true, wordWrapWidth: joinbutton.width, align: "center" });
                text.anchor.set(-0.20);
                joinbutton.addChild(text);
                this.ButtonList.push(joinbutton);

            }
        }
    }
}