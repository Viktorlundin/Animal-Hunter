"use strict";
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
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map