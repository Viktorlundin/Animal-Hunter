var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=player.js.map