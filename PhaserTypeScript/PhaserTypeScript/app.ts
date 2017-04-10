/// <reference path="p2.d.ts" />
///Player.ts
var game = new Phaser.Game(1010, 790, Phaser.AUTO, '', { preload: preload, create: create, update: update });

class Global
{
    static socket: any = null;
}

function preload()
{
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
import Player = require("./Player");

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'jungle');
    platforms = game.add.group();
    platforms.enableBody = true;
    setEventHandlers();
    weapon = game.add.weapon(100, 'bullet');
    weapon.fireRate = 20;
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.fireAngle = 180;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 400;


    player = game.add.sprite(1000, game.world.height + 100, 'dude');
    game.physics.arcade.enable(player);
    weapon.trackSprite(player, 0, 14);
    firebutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    player.body.collideWorldBounds = true;
    player.body.drag.y = 1000;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();


    mobs = game.add.group();
    mobs.enableBody = true;
    for (var i = 0; i < 5; i++)
    {

        var mob = mobs.create(i * 5, Math.floor((Math.random() * 300) + 600), 'baddie');
        mob.body.velocity.x = Math.floor((Math.random() * 10) +1);  
        //mob.animations.add('baddie', [2, 3], 1, true);
        //mob.play('baddie');
    }


   
    //var frameNames = Phaser.Animation.generateFrameNames('baddie', 0, 3);
    //mobs.callAll('animations.add', 'animations', 'walk', frameNames, 30, true, false);
    //mobs.callAll('play', null, 'walk');
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function setEventHandlers()
{

        Global.socket.on('yourID', function (data) {
            //vår player.id = data;
            
    });

        Global.socket.on('newPlayer', function (data) {
            var playerID = data;
            //new player(data); data är playerns ID
            //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
        });

        Global.socket.on('updateCoordinates', function (data) {
            var id, x, y;
            id = data.player;
            x = data.x;
            y = data.y;
             //coordinates: data, player: client.id
            //Set coordinates where player.id = player

        });

        

        //client.on("move player", onMovePlayer);
        //client.on("disconnect", onClientDisconnect);
        //client.on("place bomb", onPlaceBomb);
        //client.on("register map", onRegisterMap);
        //client.on("start game on server", onStartGame);
        //client.on("ready for round", onReadyForRound);
        //client.on("powerup overlap", onPowerupOverlap);

        //client.on("enter lobby", Lobby.onEnterLobby);
        //client.on("host game", Lobby.onHostGame);
        //client.on("select stage", Lobby.onStageSelect);
        //client.on("enter pending game", Lobby.onEnterPendingGame);
        //client.on("leave pending game", Lobby.onLeavePendingGame);
}

function BroadCastCoordinates()
{
    var x = player.body.position.x;
    var y = player.body.position.y;

        Global.socket.emit('playerMoved', { x: x, y: y, player: null });//PLAYER ID MÅSTE SÄTTAS HÄR
}

function update()
{
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(mobs, platforms);

    game.physics.arcade.collide(weapon, mobs, function (bullet, mobs) { bullet.kill(); mobs.kill(); });
    game.physics.arcade.overlap(mobs, weapon, collectStar, null, this);

    
    if (firebutton.isDown) {
        weapon.fire();
    }

    function collectStar(weapon, mobs)
    {
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
        BroadCastCoordinates();

    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('left');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 150;
        player.animations.play('left');
        BroadCastCoordinates();
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
        player.animations.play('left');
        BroadCastCoordinates();
    }
    else {
        //  Stand still
        player.animations.stop();
        player.frame = 0;
    }

    //  Allow the player to jump if they are touching the ground.
   
    //Trolololololololo
}
