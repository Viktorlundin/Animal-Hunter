

module JungleHunter {
    export class Global {
        static socket: any;
        socket = null;
        PlayerData = null;
        static numberOfPlayers: number;
    }

    export class Main extends Phaser.Game {
        constructor() {
            super(1010, 790, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Login', Login, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('RunGame', RunGame, false);
            this.state.add('Lobby', Lobby, false);
            this.state.add('Host', Host, false);
            this.state.add('GameOver', GameOver, false);
            console.log("try start boot");
            this.state.start('Boot');
        }


        //    platforms: any;
        //    //player = new Player("1");
        //    cursors: any;
        //    mobs: any;
        //    score: any = 0;
        //    scoreText: any;
        //    weapon: any;
        //    firebutton: any;

        //    createStuff() {
        //        this.physics.startSystem(Phaser.Physics.ARCADE);
        //        this.add.sprite(0, 0, 'jungle');
        //        this.platforms = this.add.group();
        //        this.platforms.enableBody = true;


        //        //this.weapon = this.add.weapon(100, 'bullet');
        //        //this.weapon.fireRate = 20;
        //        //this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //        //this.weapon.fireAngle = 180;
        //        //this.weapon.bulletAngleOffset = 0;
        //        //this.weapon.bulletSpeed = 400;


        //        //player = this.game.add.sprite(1000, this.game.world.height + 100, 'dude');
        //        //this.physics.arcade.enable(this.player);
        //        //this.weapon.trackSprite(this.player, 0, 14);
        //        //this.firebutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        //        //this.player.body.collideWorldBounds = true;
        //        //this.player.body.drag.y = 1000;

        //        this.cursors = this.input.keyboard.createCursorKeys();


        //        this.mobs = this.add.group();
        //        this.mobs.enableBody = true;
        //        this.mobs.physicsBodyType = Phaser.Physics.ARCADE;
        //        for (var i = 0; i < 5; i++) {

        //            var mob = this.mobs.create(i * 5, Math.floor((Math.random() * 300) + 600), 'baddie');
        //            mob.body.velocity.x = Math.floor((Math.random() * 10) + 1);
        //            //mob.animations.add('baddie', [2, 3], 1, true);
        //            //mob.play('baddie');
        //        }



        //        //var frameNames = Phaser.Animation.generateFrameNames('baddie', 0, 3);
        //        //mobs.callAll('animations.add', 'animations', 'walk', frameNames, 30, true, false);
        //        //mobs.callAll('play', null, 'walk');
        //        //this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //    }

        //    //    //  Collide the player and the stars with the platforms
        //    //        var hitPlatform = this.physics.arcade.collide(this, this.platforms);
        //    //this.physics.arcade.collide(this.mobs, this.platforms);

        //    //this.physics.arcade.collide(this.weapon, this.mobs, function (bullet, mobs) { bullet.kill(); mobs.kill(); });
        //    //this.physics.arcade.overlap(this.mobs, this.weapon, collectStar, null, this);


        //    //if (this.firebutton.isDown) {
        //    //    this.weapon.fire();
        //    //}

        //    //function collectStar(weapon, mobs) {
        //    //    // Removes the star from the screen
        //    //    mobs.kill();

        //    //    //  Add and update the score
        //    //    this.score += 10;
        //    //    this.scoreText.text = 'Score: ' + this.score;
        //    //}
        //    //        //  Reset the players velocity (movement)

        //}

    }
}
window.onload = () => {
    new JungleHunter.Main();
    //new TypeScriptPhaserApp1.Client.GameEngine();
};