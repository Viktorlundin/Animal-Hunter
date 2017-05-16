
module JungleHunter {
    export class Host extends Phaser.State {
        background: Phaser.Sprite;
        OnePbutton: Phaser.Button;
        TwoPButton: Phaser.Button;
        ThreePButton: Phaser.Button;
        FourPButton: Phaser.Button;
        backbutton: Phaser.Button;
        Text: any;
        style: any;


        create() {
            console.log("Är i  host menu nu.");
            this.background = this.add.sprite(0, 0, 'Host');
            //this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.backbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 300, 'BackButton', this.GoBack, this)
            this.OnePbutton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 200, '1pButton', this.OnePfunc, this)
            this.TwoPButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 100, '2pButton', this.TwoPfunc, this)
            this.ThreePButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, '3pButton', this.ThreePfunc, this)
            this.FourPButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, '4pButton', this.FourPfunc, this)
            this.style = { font: "32px Elephant", fill: "pink" }
            this.Text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 300, "Select number of players", this.style)
        }

        GoBack() {
            this.game.state.start('MainMenu', true, false);
        }

        OnePfunc() {
            Global.numberOfPlayers = 1;
            this.CreateRoom(Global.prototype.PlayerData.username);
            this.game.state.start('RunGame', true, false);
        }

        TwoPfunc() {
            Global.numberOfPlayers = 2;
            this.CreateRoom(Global.prototype.PlayerData.username);
            this.game.state.start('RunGame', true, false);
        }

        ThreePfunc() {
            Global.numberOfPlayers = 3;
            this.CreateRoom(Global.prototype.PlayerData.username);
            this.game.state.start('RunGame', true, false);
        }

        FourPfunc() {
            Global.numberOfPlayers = 4;
            this.CreateRoom(Global.prototype.PlayerData.username);
            this.game.state.start('RunGame', true, false);
        }

        CreateRoom(playerName) {
            Global.prototype.PlayerData.activeGameRoom = playerName;
            Global.socket.emit('createRoom', { room: Global.prototype.PlayerData.activeGameRoom, numberOfPlayers: Global.numberOfPlayers });

        }


        LeaveRoom(playerName) {
            Global.socket.leave(playerName);
        }

    }
}