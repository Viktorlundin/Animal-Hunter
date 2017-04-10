var Global = (function () {
    function Global() {
    }
    Global.socket = null;
    return Global;
}());
var game = new Phaser.Game(1010, 790, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
    console.log("socket " + (Global.socket !== null));
    game.load.image('jungle', 'Jungle.png');
    game.load.image('ground', 'platform.png');
    game.load.image('baddie', 'baddie.png');
    game.load.image('bullet', 'bullet.png');
    game.load.spritesheet('dude', 'dude.png', 32, 48);
}
var platforms;
var player;
var cursors;
var mobs;
var score = 0;
var scoreText;
var weapon;
var firebutton;
function create() {
    //  We're going to be using physics, so enable the Arcade Physics system.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    game.add.sprite(0, 0, 'jungle');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    //  Now let's create two ledges
    // The player and its settings
    weapon = game.add.weapon(100, 'bullet');
    weapon.fireRate = 20;
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.fireAngle = 180;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 400;
    player = game.add.sprite(1000, game.world.height + 100, 'dude');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    weapon.trackSprite(player, 0, 14);
    firebutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.collideWorldBounds = true;
    player.body.drag.y = 1000;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    mobs = game.add.group();
    mobs.enableBody = true;
    for (var i = 0; i < 5; i++) {
        var mob = mobs.create(i * 5, Math.floor((Math.random() * 300) + 600), 'baddie');
        mob.body.velocity.x = Math.floor((Math.random() * 10) + 1);
    }
    //var frameNames = Phaser.Animation.generateFrameNames('baddie', 0, 3);
    //mobs.callAll('animations.add', 'animations', 'walk', frameNames, 30, true, false);
    //mobs.callAll('play', null, 'walk');
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}
function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(mobs, platforms);
    game.physics.arcade.overlap(mobs, weapon.bullets, hitenemy, null, this);
    if (firebutton.isDown) {
        weapon.fire();
    }
    function hitenemy(weapon, mobs) {
        // Removes the star from the screen
        mobs.kill();
        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('left');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
        player.animations.play('left');
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
        player.animations.play('left');
    }
    else {
        //  Stand still
        player.animations.stop();
        player.frame = 0;
    }
    //  Allow the player to jump if they are touching the ground.
    //Trolololololololo
}
//# sourceMappingURL=app.js.map