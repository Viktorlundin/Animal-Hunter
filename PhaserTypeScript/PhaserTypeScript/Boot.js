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
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    JungleHunter.Boot = Boot;
})(JungleHunter || (JungleHunter = {}));
//# sourceMappingURL=Boot.js.map