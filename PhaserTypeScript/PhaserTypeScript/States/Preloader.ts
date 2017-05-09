module JungleHunter {
    export class Preloader extends Phaser.State {
        loaderText: Phaser.Text;
        preload() {
            this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...",
                { font: "18px Arial", fill: "#A9A91111", align: "center" });
            this.loaderText.anchor.setTo(0.5);
            this.load.image('jungle', 'Jungle.png');
            this.load.image('ground', 'platform.png');
            this.load.image('titlepage', 'JungleHunterTitlescreen.png');
            this.load.image('loginpage', 'loginbackground.png');
            this.load.image('login', 'Login.png');
            this.load.image('register', 'Register.png');
            this.load.image('baddie', 'baddie.png');
            this.load.image('bullet', 'bullet.png');
            this.load.image('Startgame', 'Startgame.png');
            this.load.spritesheet('dude', 'dude.png', 32, 48);
            this.load.spritesheet('baddie', 'baddie.png', 15, 32);
            this.load.spritesheet('checkbox', 'checkbox.png', 21, 27);
            this.load.image('Lobby', 'Lobby.jpg');
            this.load.image('Host', 'Host.jpg');
            this.load.image('HostGameButton', 'hostgame.png');
            this.load.image('JoinGameButton', 'joingame.png');
            this.load.image('LogOutButton', 'logout.png');
            this.load.image('BackButton', 'goback.png');
            this.load.image('EmptyButton', 'EmptyButton.png');
            this.load.image('1pButton', '1p.png');
            this.load.image('2pButton', '2p.png');
            this.load.image('3pButton', '3p.png');
            this.load.image('4pButton', '4p.png');
            
        }

        create() {
            console.log("i preloader");
            var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 1000,
                Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startLogin, this);
        }
        startLogin() {
            this.game.state.start('Login', true, false);
        }
    }
}