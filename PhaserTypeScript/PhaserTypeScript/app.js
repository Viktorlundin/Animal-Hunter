var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
    game.load.image('jungle', 'Jungle.png');
    game.load.image('ground', 'platform.png');
    game.load.image('supermario', 'SuperMario.png');
    game.load.image('bullet', 'bullet.png');
    game.load.spritesheet('dude', 'dude.png', 32, 48);
}
var platforms;
var player;
var cursors;
var stars;
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
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    //  Now let's create two ledges
    weapon = game.add.weapon(100, 'bullet');
    weapon.fireRate = 20;
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.fireAngle = 180;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 400;
    //j
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 1000, 'dude');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    weapon.trackSprite(player, 0, 14);
    firebutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.friction = 1;
    player.body.collideWorldBounds = true;
    player.body.drag.y = 1000;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 10; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 1, Math.floor((Math.random() * 245) + 250), 'supermario');
        //  Let gravity do its thing
        star.body.velocity.x = Math.floor((Math.random() * 10) + 1);
    }
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}
function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(weapon, stars, function (bullet, stars) { bullet.kill(); stars.kill(); });
    game.physics.arcade.overlap(stars, weapon, collectStar, null, this);
    function collectStar(weapon, supermario) {
        // Removes the star from the screen
        supermario.kill();
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
        player.animations.play('right');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
    }
    else if (firebutton.isDown) {
        weapon.fire();
    }
    else {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    //Trolololololololo
}
//# sourceMappingURL=app.js.map