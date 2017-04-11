import * as game from "./Game.ts";
export class Player {

    public id: string;
    public time: number; //Last time for receiving data from the player. Used for timeout check.
    public x: number;
    public y: number;
    public body: any;
    public animations: any;
    public frame: any;
    public sprite: any;

    public constructor(id: string) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.time = new Date().getTime(); //time in milliseconds
    }

    public update_time() {
        this.time = new Date().getTime();
    }

    public check_id(id: string) {
        return this.id == id;
    }

    public set(x: number, y: number) {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.update_time();
    }

    //player = this.game.add.sprite(1000, this.game.world.height + 100, 'dude');
    //game.physics.arcade.enable(this.player);
    //this.weapon.trackSprite(this.player, 0, 14);
    //this.firebutton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    //this.player.body.collideWorldBounds = true;
    //this.player.body.drag.y = 1000;
    //this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    //this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    //this.cursors = this.game.input.keyboard.createCursorKeys();
}
