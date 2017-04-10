"use strict";
var GameForFour = (function () {
    function GameForFour() {
        this.players = new Array(4);
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = null;
        }
    }
    GameForFour.prototype.search_id = function (id) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] != null) {
                if (this.players[i].check_id(id))
                    return i;
            }
        }
        return -1;
    };
    GameForFour.prototype.search_empty = function () {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] != null) {
                return i;
            }
        }
        return -1;
    };
    return GameForFour;
}());
module.exports = GameForFour;
//# sourceMappingURL=Game.js.map