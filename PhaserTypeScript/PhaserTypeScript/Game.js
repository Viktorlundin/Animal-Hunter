var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JungleHunter;
(function (JungleHunter) {
    //import * as game from "./Game.ts";
    console.log("yoyoyo");
    window.onload = function () { var game = new JungleHunter.Main(); };
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.create = function () {
            console.log("works");
            //this.setEventHandlers();
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    JungleHunter.Boot = Boot;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var Global = (function () {
        function Global() {
            this.socket = null;
        }
        return Global;
    }());
    JungleHunter.Global = Global;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this, 1010, 790, Phaser.AUTO, 'content', null);
            this.state.add('Boot', JungleHunter.Boot, false);
            this.state.add('Preloader', JungleHunter.Preloader, false);
            this.state.add('MainMenu', JungleHunter.MainMenu, false);
            this.state.add('RunGame', JungleHunter.RunGame, false);
            console.log("try start boot");
            this.state.start('Boot');
        }
        return Main;
    }(Phaser.Game));
    JungleHunter.Main = Main;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            //this.game.state.start('RunGame', true, false);
            var plugin = new PhaserInput.Plugin(this.game, this.game.plugins);
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
        };
        MainMenu.prototype.startGame = function () {
            //this.game.state.start('runGame', true, false)
        };
        return MainMenu;
    }(Phaser.State));
    JungleHunter.MainMenu = MainMenu;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'dude', 0);
            this.x = null;
            this.y = null;
            this.lastXPosition = null;
            this.lastYPosition = null;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.x = x;
            this.y = y;
            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.drag.y = 1000;
            this.game.physics.arcade.enable(this);
            this.game.add.existing(this);
        }
        ;
        return Player;
    }(Phaser.Sprite));
    JungleHunter.Player = Player;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.load.image('jungle', 'Jungle.png');
            this.load.image('ground', 'platform.png');
            this.load.image('baddie', 'baddie.png');
            this.load.image('bullet', 'bullet.png');
            this.load.spritesheet('dude', 'dude.png', 32, 48);
        };
        Preloader.prototype.create = function () {
            console.log("i preloader");
            this.game.state.start('MainMenu', true, false);
        };
        Preloader.prototype.startMainMenu = function () {
            //this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    JungleHunter.Preloader = Preloader;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var RunGame = (function (_super) {
        __extends(RunGame, _super);
        function RunGame() {
            _super.apply(this, arguments);
            this.playerID = null;
            this.playerList = new Array();
        }
        RunGame.prototype.create = function () {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            for (var i = 1; i < 5; i++) {
                this.playerList[i] = new JungleHunter.Player(this.game, 900, (100 + (i * 130)));
            }
            this.setEventHandlers();
        };
        RunGame.prototype.update = function () {
            if (this.playerID != null) {
                this.Movement(this.playerList[this.playerID]);
            }
        };
        RunGame.prototype.Movement = function (player) {
            player.body.velocity.x = 0;
            if (player.cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            }
            else if (player.cursors.right.isDown) {
                player.body.velocity.x = 150;
                player.animations.play('left');
            }
            else if (player.cursors.down.isDown) {
                player.body.velocity.y = 150;
                player.animations.play('left');
            }
            else if (player.cursors.up.isDown) {
                player.body.velocity.y = -150;
                player.animations.play('left');
            }
            else {
                player.animations.stop();
                player.frame = 0;
            }
            this.BroadCastPlayerCoordinates(player);
        };
        RunGame.prototype.EventSetMyPlayerID = function (data) {
            this.playerID = data;
        };
        RunGame.prototype.EventNewPlayer = function (data) {
        };
        RunGame.prototype.EventUpdateCoordinates = function (data) {
            var id, x, y;
            id = data.player;
            x = data.x;
            y = data.y;
            this.playerList[id].x = x;
            this.playerList[id].y = y;
        };
        RunGame.prototype.BroadCastPlayerCoordinates = function (player) {
            if (!((player.x == player.lastXPosition) && (player.y == player.lastYPosition))) {
                var x = player.body.position.x;
                var y = player.body.position.y;
                JungleHunter.Global.socket.emit('playerMoved', { x: x, y: y, player: this.playerID });
                console.log("coords sent");
            }
            player.lastXPosition = player.x;
            player.lastYPosition = player.y;
        };
        RunGame.prototype.setEventHandlers = function () {
            var _this = this;
            console.log("event handler set");
            JungleHunter.Global.socket.on('TotalConnections', function (data) { return _this.EventSetMyPlayerID(data); });
            JungleHunter.Global.socket.on('newPlayer', function (data) { return _this.EventNewPlayer(data); });
            JungleHunter.Global.socket.on('updateCoordinates', function (data) { return _this.EventUpdateCoordinates(data); });
            //Call
            JungleHunter.Global.socket.emit('HowManyTotalConnections', null);
        };
        return RunGame;
    }(Phaser.State));
    JungleHunter.RunGame = RunGame;
})(JungleHunter || (JungleHunter = {}));
//# sourceMappingURL=game.js.map