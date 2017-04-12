var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JungleHunter;
(function (JungleHunter) {
    var RunGame = (function (_super) {
        __extends(RunGame, _super);
        function RunGame() {
            _super.apply(this, arguments);
        }
        RunGame.prototype.create = function () {
            this.player = new JungleHunter.Player(this.game, 130, 200, "1");
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.add.sprite(0, 0, 'jungle');
            var platforms = this.add.group();
            platforms.enableBody = true;
        };
        return RunGame;
    }(Phaser.State));
    JungleHunter.RunGame = RunGame;
})(JungleHunter || (JungleHunter = {}));
//# sourceMappingURL=RunGame.js.map