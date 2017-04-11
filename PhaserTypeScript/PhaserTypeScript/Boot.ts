module JungleHunter {
    export class Boot extends Phaser.State {
        setEventHandlers() {
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
        }
        create() {
            this.setEventHandlers();
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        }
    }
}