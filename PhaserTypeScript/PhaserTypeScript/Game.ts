/// <reference path="./player.ts"/>
import * as player from "./player.ts";
export class GameForFour {

    constructor() {
        this.game = new Phaser.Game(1010, 790, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
    }
    game: Phaser.Game;

    platforms: any;
    player = new player.Player("1");
    cursors: any;
    mobs: any;
    score: any = 0;
    scoreText: any;
    weapon: any;
    firebutton: any;


    preload() {
        this.game.load.image('jungle', 'Jungle.png');
        this.game.load.image('ground', 'platform.png');
        this.game.load.image('baddie', 'baddie.png');
        this.game.load.image('bullet', 'bullet.png');
        this.game.load.spritesheet('dude', 'dude.png', 32, 48);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'jungle');
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;


        this.weapon = this.game.add.weapon(100, 'bullet');
        this.weapon.fireRate = 20;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.fireAngle = 180;
        this.weapon.bulletAngleOffset = 0;
        this.weapon.bulletSpeed = 400;


        //player = this.game.add.sprite(1000, this.game.world.height + 100, 'dude');
        this.game.physics.arcade.enable(this.player);
        this.weapon.trackSprite(this.player, 0, 14);
        this.firebutton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.player.body.collideWorldBounds = true;
        this.player.body.drag.y = 1000;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();


        this.mobs = this.game.add.group();
        this.mobs.enableBody = true;
        this.mobs.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 5; i++) {

            var mob = this.mobs.create(i * 5, Math.floor((Math.random() * 300) + 600), 'baddie');
            mob.body.velocity.x = Math.floor((Math.random() * 10) + 1);
            //mob.animations.add('baddie', [2, 3], 1, true);
            //mob.play('baddie');
        }



        //var frameNames = Phaser.Animation.generateFrameNames('baddie', 0, 3);
        //mobs.callAll('animations.add', 'animations', 'walk', frameNames, 30, true, false);
        //mobs.callAll('play', null, 'walk');
        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        //  Collide the player and the stars with the platforms
        var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.mobs, this.platforms);

        this.game.physics.arcade.collide(this.weapon, this.mobs, function (bullet, mobs) { bullet.kill(); mobs.kill(); });
        this.game.physics.arcade.overlap(this.mobs, this.weapon, collectStar, null, this);


        if (this.firebutton.isDown) {
            this.weapon.fire();
        }

        function collectStar(weapon, mobs) {
            // Removes the star from the screen
            mobs.kill();

            //  Add and update the score
            this.score += 10;
            this.scoreText.text = 'Score: ' + this.score;
        }
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('left');
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 150;
            this.player.animations.play('left');
        }
        else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -150;
            this.player.animations.play('left');
        }
        else {
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 0;
        }
    }
    //public players: any = new Array(4);

    //public constructor() {
    //    for (var i = 0; i < this.players.length; i++){
    //        this.players[i] = null;
    //    }
    //}

    //public search_id(id: string) {
    //    for (var i = 0; i < this.players.length; i++) {
    //        if (this.players[i] != null) {
    //            if (this.players[i].check_id(id))
    //                return i;
    //        }
    //    }
    //    return -1;
    //}

    //public search_empty() {
    //    for (var i = 0; i < this.players.length; i++) {
    //        if (this.players[i] != null) {
    //            return i;
    //        }
    //    }
    //    return -1;
    //}
}