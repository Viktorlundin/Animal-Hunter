module JungleHunter {

    export class RunGame extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: JungleHunter.Player;
        platforms: Phaser.Group;
        playerList: any;


        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'jungle');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            
            console.log("i run game");
            this.playerList = [];
            this.setEventHandlers();
            this.playerList = new Player(this.game, 130, 200, "id");
            
        }


        setEventHandlers(): any {

            Global.socket.on('yourID', function (data) {
                var p = new Player(this.game, 130, 200, data);
                this.playerList.push(p);
                //vår player.id = data;
            });

            Global.socket.on('newPlayer', function (data) {
                console.log("NY SPELARE FUNKAR");
                var p = new Player(this.game, 130, 200, data);
                this.playerList.push(p);
                //this.playerList.push(new Player(this.game, 130, 200, data));//error
                //new player(data); data är playerns ID
                //spelarna lär finnas i en lista så man kan iterera den och hitta spelarens id
            });

            Global.socket.on('updateCoordinates', function (data) {
                console.log("NY KORDINAT");
                var id, x, y;
                id = data.player;
                x = data.x;
                y = data.y;
                //coordinates: data, player: client.id
                //Set coordinates where player.id = player
            });
        }

    }
}