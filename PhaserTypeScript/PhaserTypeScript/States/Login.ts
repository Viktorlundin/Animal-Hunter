module JungleHunter {
    export class Login extends Phaser.State {
        background: Phaser.Sprite;
        loginbutton: Phaser.Button;
        registerbutton: Phaser.Button;
        inputPassword: any;
        inputName: any;
        inputEmail: any;

        create() {
            console.log("Är i login menu nu.");
            this.background = this.add.sprite(0, 0, 'loginpage');
            this.loginbutton = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY, 'login', this.login, this);
            this.registerbutton = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY, 'register', this.registernewPlayer, this);
            let plugin = new PhaserInput.Plugin(this.game, this.game.plugins);
            this.add.plugin(plugin);
            this.inputEmail = this.game.add.inputField(330, 195, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Email',
                type: PhaserInput.InputType.text
            });
            this.inputName = this.game.add.inputField(330, 90, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Nickname',
                type: PhaserInput.InputType.text
            });
            this.inputPassword = this.game.add.inputField(330, 300, {
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

        }

        registernewPlayer() {
            Global.socket.emit('CanIRegister', { email: "joe@goes.se", password: "sanfer123", username: "JungleJontas" });
            
        }

        login() {
            console.log(this.inputPassword);
            Global.socket.emit('CanILogin', { email: "joe@goes.se", password: "sanfer123" });
            this.startGame();
        }

        startGame() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}