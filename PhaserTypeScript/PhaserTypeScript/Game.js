var JungleHunter;
(function (JungleHunter) {
    //import * as game from "./Game.ts";
    console.log("yoyoyo");
    window.onload = function () { var game = new JungleHunter.Game(); };
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
    //import * as Player from "./player";
    var Global = (function () {
        function Global() {
            this.myID = null;
            this.socket = null;
        }
        return Global;
    }());
    JungleHunter.Global = Global;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1010, 790, Phaser.AUTO, 'content', null);
            this.state.add('Boot', JungleHunter.Boot, false);
            this.state.add('Preloader', JungleHunter.Preloader, false);
            this.state.add('MainMenu', JungleHunter.MainMenu, false);
            this.state.add('RunGame', JungleHunter.RunGame, false);
            console.log("try start boot");
            this.state.start('Boot'); //Går aldrig till boot
        }
        return Game;
    }(Phaser.Game));
    JungleHunter.Game = Game;
})(JungleHunter || (JungleHunter = {}));
var JungleHunter;
(function (JungleHunter) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.game.state.start('RunGame', true, false);
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
            this.id = null;
            this.x = null;
            this.y = null;
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
        Player.prototype.BroadCastCoordinates = function () {
            var x = this.body.position.x;
            var y = this.body.position.y;
            //Global.socket.emit('kek', "lol");//denna funkar, PROBLEMET ÄR ATT DET INTE GÅR O EMITA FLERA SAKER SATMIDIGT SOM NEDAN
            JungleHunter.Global.socket.emit('playerMoved', { x: x, y: y, player: JungleHunter.Global.myID }); //GÅR EJ ATT EMITA FLERA VÄRDEN SAMTIDIGT!!!!
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
            console.log("i preloader");
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
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            this.playerOne = new JungleHunter.Player(this.game, 130, 250);
            this.playerTwo = new JungleHunter.Player(this.game, 130, 300);
            this.playerThree = new JungleHunter.Player(this.game, 130, 100);
            this.playerFour = new JungleHunter.Player(this.game, 130, 200);
            //console.log("MY PLAYER ID:" + Global.myID); //this.myPlayerID
        };
        RunGame.prototype.GetFreePlayer = function () {
            JungleHunter.Global.socket.on('TotalConnections', function (data) {
                console.log('Total connections:' + data);
                JungleHunter.Global.myID = data;
                console.log("GLOBAL ID: " + JungleHunter.Global.myID);
            });
            JungleHunter.Global.socket.emit('HowManyTotalConnections', null);
            //emita
        };
        RunGame.prototype.CallEventHandler = function () {
            //if (Global.myID == null) {
            this.GetFreePlayer();
            this.GetFreePlayer();
            console.log("globid=" + JungleHunter.Global.myID);
            if (JungleHunter.Global.myID == 1) {
                console.log("running event handler");
                this.setEventHandlers(this.playerOne);
            }
            else if (JungleHunter.Global.myID == 2) {
                this.setEventHandlers(this.playerTwo);
            }
            else if (JungleHunter.Global.myID == 3) {
                this.setEventHandlers(this.playerThree);
            }
            else if (JungleHunter.Global.myID == 4) {
                this.setEventHandlers(this.playerFour);
            }
            //  }
        };
        RunGame.prototype.update = function () {
            if (JungleHunter.Global.myID == null) {
                //this.GetFreePlayer();
                this.GetFreePlayer();
                console.log("globid=" + JungleHunter.Global.myID);
                if (JungleHunter.Global.myID == 1) {
                    console.log("running event handler");
                    this.setEventHandlers(this.playerOne);
                }
                else if (JungleHunter.Global.myID == 2) {
                    this.setEventHandlers(this.playerTwo);
                }
                else if (JungleHunter.Global.myID == 3) {
                    this.setEventHandlers(this.playerThree);
                }
                else if (JungleHunter.Global.myID == 4) {
                    this.setEventHandlers(this.playerFour);
                }
            }
            //if (this.clientID != null)
            // {
            if (JungleHunter.Global.myID == 1)
                this.Movement(this.playerOne);
            else if (JungleHunter.Global.myID == 2)
                this.Movement(this.playerTwo);
            else if (JungleHunter.Global.myID == 3)
                this.Movement(this.playerThree);
            else if (JungleHunter.Global.myID == 4)
                this.Movement(this.playerFour);
            //}
        };
        RunGame.prototype.Movement = function (playerMe) {
            playerMe.body.velocity.x = 0;
            if (playerMe.cursors.left.isDown) {
                playerMe.body.velocity.x = -150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.right.isDown) {
                playerMe.body.velocity.x = 150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.down.isDown) {
                playerMe.body.velocity.y = 150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else if (playerMe.cursors.up.isDown) {
                playerMe.body.velocity.y = -150;
                playerMe.animations.play('left');
                playerMe.BroadCastCoordinates();
            }
            else {
                playerMe.animations.stop();
                playerMe.frame = 0;
            }
        };
        RunGame.prototype.setEventHandlers = function (playerMe) {
            console.log("event handler set");
            JungleHunter.Global.socket.on('yourID', function (data) {
                //Global.myID = data;
                playerMe.id = data;
                console.log("MIN ID AR NU:" + playerMe.id); // + this.playerMe.id
                //this.playerList.push(new Player(this.game, 130, 200, data));
                //vår player.id = data;
            });
            JungleHunter.Global.socket.on('newPlayer', function (data) {
                console.log("NY SPELARE FUNKAR");
                //this.player = new Player(this.game, 130, 200, "lol");
                //this.playerList.push(new Player(this.game, 130, 200, "kek"));
                //this.playerList.push(new Player(this.game, 130, 200, data));
                //this.playerList.push(new Player(this.game, 130, 200, data));//error
                //new player(data); data är playerns ID
                //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
            });
            JungleHunter.Global.socket.on('updateCoordinates', function (data) {
                console.log("NY KORDINAT");
                var id, x, y;
                id = data.player;
                x = data.x;
                y = data.y;
                console.log("HÄMTAD KORDINAT:" + x + " " + y + " " + id);
                //coordinates: data, player: client.id
                //Set coordinates where player.id = player
            });
        };
        return RunGame;
    }(Phaser.State));
    JungleHunter.RunGame = RunGame;
})(JungleHunter || (JungleHunter = {}));
//# sourceMappingURL=game.js.map