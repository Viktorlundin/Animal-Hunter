class Player
{
    constructor() { }
    speed: any = 150;
    player: any;
    loadPlayer = function ()
    {
        this.player = game.add.sprite(1000, game.world.height + 100, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.drag.y = 1000;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();
    }

    movePlayer = function ()
    {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            this.player.body.velocity.x = -this.speed;
            this.player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            this.player.body.velocity.x = this.speed;
            this.player.animations.play('left');
        }
        else if (cursors.down.isDown)
        {
            this.player.body.velocity.y = this.speed;
            this.player.animations.play('left');
        }
        else if (cursors.up.isDown)
        {
            this.player.body.velocity.y = -this.speed;
            this.player.animations.play('left');
        }
        else
        {
            this.player.animations.stop();
            this.player.frame = 0;
        }
    }
}