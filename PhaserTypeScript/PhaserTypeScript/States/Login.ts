module JungleHunter {
    export class AccountData
    {
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
        checkbox: Phaser.Button;
        style: any;
        styles: any;
        Style: any;
        text: any;
        rememberText: any;

        create() {
            console.log("Är i login menu nu.");
            this.setLoginEventHandlers(); //Sätter lyssna funktion(er)
            this.setLoginEventandlers();
            this.setRegisterEventHandlers();
            this.background = this.add.sprite(0, 0, 'loginpage');
            this.loginbutton = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY, 'login', this.login, this);
            this.registerbutton = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY, 'register', this.registernewPlayer, this);
            this.styles = { font: "32px Elephant", fill: "white" };
            this.rememberText = this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY + 100, "Remember me", this.styles);
            this.checkbox = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY + 120, 'checkbox', this.actiononclick, this, null, null, null, null);
            this.checkbox.anchor.setTo(0.5, 0.5);
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
            this.checkCookie();
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

        checkCookie() {
            var useremail = this.getCookie("userEmail");
            var username = this.getCookie("userName");
            if (useremail != null) {
                this.inputEmail.setText(useremail);
                this.inputName.setText(username);
                this.checkbox.frame = 1;
            }
            else {
                if (useremail != "" && useremail != null) {
                    this.setCookie("userEmail", useremail, 365);
                    this.setCookie("userName", username, 365);
                }
            }
        }

        EventLoginAccepted(accountData)
        {
            if (this.checkbox.frame == 1) {
                this.setCookie("userEmail", this.inputEmail.value, 365);
                this.setCookie("userName", this.inputName.value, 365);
            }
            if (accountData)
            {
                //Sätt in all accountdata i en klass obj och skicka med den i startGame(klass obj)
                let PlayerData = new AccountData();
                PlayerData.email = accountData.email;
                PlayerData.username = accountData.username;
                PlayerData.password = accountData.password;

                Global.prototype.PlayerData = PlayerData;

                this.startGame();
            }
            
        }


        loginfailed() {
            this.style = { font: "64px Elephant", fill: "red" };
            this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Failed to login", this.style);
            var tween = this.add.tween(this.text).to({ alpha: 0 }, 1500,
                Phaser.Easing.Linear.None, true);
        }

        Registerfailed() {
            this.Style = { font: "18px Elephant", fill: "red" };
            this.text = this.game.add.text(this.game.world.centerX - 250, this.game.world.centerY - 150, "A user with that email is already registered", this.Style);
            var tween = this.add.tween(this.text).to({ alpha: 0 }, 5000,
                Phaser.Easing.Linear.None, true);
        }

        actiononclick() {
            if (this.checkbox.frame == 0) {
                this.checkbox.frame = 1;
            }
            else {
                this.checkbox.frame = 0;
            }
        }

        setLoginEventandlers() {
            Global.socket.on('loginfailed', () => this.loginfailed());
        }

        setRegisterEventHandlers() {
            Global.socket.on('RegisterFailed', () => this.Registerfailed());
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
            this.state.states['MainMenu'].playername = this.inputName.value;
            this.game.state.start('MainMenu', true, false);
        }
    }
}