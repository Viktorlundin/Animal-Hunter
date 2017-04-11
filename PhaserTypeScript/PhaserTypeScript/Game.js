var JungleHunter;
(function (JungleHunter) {
    //import * as game from "./Game.ts";
    console.log("yoyoyo");
    window.onload = function () { var game = new JungleHunter.GameForFour(); };
})(JungleHunter || (JungleHunter = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JungleHunter;
(function (JungleHunter) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.setEventHandlers = function () {
            JungleHunter.Global.socket.on('yourID', function (data) {
                //vår player.id = data;
            });
            JungleHunter.Global.socket.on('newPlayer', function (data) {
                var playerID = data;
                //new player(data); data är playerns ID
                //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
            });
            JungleHunter.Global.socket.on('updateCoordinates', function (data) {
                var id, x, y;
                id = data.player;
                x = data.x;
                y = data.y;
                //coordinates: data, player: client.id
                //Set coordinates where player.id = player
            });
        };
        Boot.prototype.create = function () {
            this.setEventHandlers();
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    JungleHunter.Boot = Boot;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    //import * as Player from "./player";
    var Global = (function () {
        function Global() {
        }
        Global.socket = null;
        return Global;
    }());
    JungleHunter.Global = Global;
    var GameForFour = (function (_super) {
        __extends(GameForFour, _super);
        function GameForFour() {
            _super.call(this, 1010, 790, Phaser.AUTO, 'content');
            this.score = 0;
            console.log("yoyoyo");
            this.state.add('Boot', JungleHunter.Boot, false);
            this.state.add('Preloader', JungleHunter.Preloader, false);
            this.state.add('MainMenu', JungleHunter.MainMenu, false);
            this.state.add('RunGame', JungleHunter.RunGame, false);
            this.state.add('player', JungleHunter.Player, false);
            this.state.start('Boot');
        }
        GameForFour.prototype.createStuff = function () {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            //this.weapon = this.add.weapon(100, 'bullet');
            //this.weapon.fireRate = 20;
            //this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            //this.weapon.fireAngle = 180;
            //this.weapon.bulletAngleOffset = 0;
            //this.weapon.bulletSpeed = 400;
            //player = this.game.add.sprite(1000, this.game.world.height + 100, 'dude');
            //this.physics.arcade.enable(this.player);
            //this.weapon.trackSprite(this.player, 0, 14);
            //this.firebutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
            //this.player.body.collideWorldBounds = true;
            //this.player.body.drag.y = 1000;
            this.cursors = this.input.keyboard.createCursorKeys();
            this.mobs = this.add.group();
            this.mobs.enableBody = true;
            this.mobs.physicsBodyType = Phaser.Physics.ARCADE;
            for (var i = 0; i < 5; i++) {
                var mob = this.mobs.create(i * 5, Math.floor((Math.random() * 300) + 600), 'baddie');
                mob.body.velocity.x = Math.floor((Math.random() * 10) + 1);
            }
            //var frameNames = Phaser.Animation.generateFrameNames('baddie', 0, 3);
            //mobs.callAll('animations.add', 'animations', 'walk', frameNames, 30, true, false);
            //mobs.callAll('play', null, 'walk');
            //this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        };
        return GameForFour;
    }(Phaser.Game));
    JungleHunter.GameForFour = GameForFour;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('runGame', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    JungleHunter.MainMenu = MainMenu;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, id) {
            _super.call(this, game, x, y, 'dude', 0);
            this.id = id;
            this.x = 0;
            this.y = 0;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.drag.y = 1000;
            this.game.physics.arcade.enableBody(this);
            this.game.add.existing(this);
        }
        Player.prototype.check_id = function (id) {
            return this.id == id;
        };
        Player.prototype.set = function (x, y) {
            this.x = Math.round(x);
            this.y = Math.round(y);
        };
        Player.prototype.BroadCastCoordinates = function () {
            var x = this.body.position.x;
            var y = this.body.position.y;
            JungleHunter.Global.socket.emit('playerMoved', { x: x, y: y, player: null }); //PLAYER ID MÅSTE SÄTTAS HÄR
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = 150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else if (this.cursors.up.isDown) {
                this.body.velocity.y = -150;
                this.animations.play('left');
                this.BroadCastCoordinates();
            }
            else {
                this.animations.stop();
                this.frame = 0;
            }
        };
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
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
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
        }
        RunGame.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            this.player = new JungleHunter.Player(this.game, 130, 200, "1");
        };
        return RunGame;
    }(Phaser.State));
    JungleHunter.RunGame = RunGame;
})(JungleHunter || (JungleHunter = {}));
//# sourceMappingURL=game.js.map