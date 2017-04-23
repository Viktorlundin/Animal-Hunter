module JungleHunter {
    export class MainMenu extends Phaser.State {
        create() {
            //this.game.state.start('RunGame', true, false);

            let plugin = new PhaserInput.Plugin(this.game, this.game.plugins);
            this.add.plugin(plugin);
            var input = this.game.add.inputField(10, 90, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Password',
                type: PhaserInput.InputType.password
            });
            Global.socket.emit('CanIRegister', { email: "joe@goes.se", password: "sanfer123", username: "JungleJontas" });
            Global.socket.emit('CanILogin', { email: "joe@goes.se", password: "sanfer123" });
        }

        startGame() {
            //this.game.state.start('runGame', true, false)
        }
    }
}