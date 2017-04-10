"use strict";
var game = require("./Game.ts");
var Player = (function () {
    function Player(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.time = new Date().getTime(); //time in milliseconds
    }
    Player.prototype.update_time = function () {
        this.time = new Date().getTime();
    };
    Player.prototype.check_id = function (id) {
        return this.id == id;
    };
    Player.prototype.set = function (x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.update_time();
    };
    Player.prototype.loadplayer = function () {
        game.player = this.game.add.sprite(1000, this.game.world.height + 100, 'dude');
        this.game.physics.arcade.enable(this.player);
        this.weapon.trackSprite(this.player, 0, 14);
        this.firebutton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.player.body.collideWorldBounds = true;
        this.player.body.drag.y = 1000;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map