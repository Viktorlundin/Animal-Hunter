var game = new Phaser.Game(1010, 790, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
    game.load.image('djungle', 'djungel.jpg');
    game.load.spritesheet('dude', 'dude.png', 32, 48);
}
var platforms;
var player;
var cursors;
function create() {
    game.add.sprite(0, 0, 'djungle');
    platforms = game.add.group();
    platforms.enableBody = true;
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.drag.y = 1000;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
}
function update() {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
        player.animations.play('left');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }
}
//# sourceMappingURL=app.js.map