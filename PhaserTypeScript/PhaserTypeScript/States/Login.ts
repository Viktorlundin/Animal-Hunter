module JungleHunter {
    export class AccountData {
        username: string;
        email: string;
        password: string;

        activeGameRoom: string = null;
        level: any;
        xp: any;

    }

    export class Login extends Phaser.State {
        background: Phaser.Sprite;
        loginbutton: Phaser.Button;
        registerbutton: Phaser.Button;
        inputPassword: any;
        inputName: any;
        inputEmail: any;

        create() {
            console.log("Är i login menu nu.");
            this.setLoginEventHandlers(); //Sätter lyssna funktion(er)
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

        EventLoginAccepted(accountData) {
            if (accountData) {
                //Sätt in all accountdata i en klass obj och skicka med den i startGame(klass obj)
                let PlayerData = new AccountData();
                PlayerData.email = accountData.email;
                PlayerData.username = accountData.username;
                PlayerData.password = accountData.password;

                Global.prototype.PlayerData = PlayerData;

                this.startGame();
            }

        }

        setLoginEventHandlers() {
            Global.socket.on('LoginAccepted', (data) => this.EventLoginAccepted(data));
        }

        registernewPlayer() {
            Global.socket.emit('CanIRegister', { email: this.inputEmail.value, password: this.inputPassword.value, username: this.inputName.value });
        }

        login() {
            Global.socket.emit('CanILogin', { email: this.inputEmail.value, password: this.inputPassword.value });
            console.log("Emittat");
        }

        startGame() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}