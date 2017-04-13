module JungleHunter {
    export class Boot extends Phaser.State {
        create() {
            console.log("works");
            //this.setEventHandlers();
            this.game.state.start('Preloader', true, false);
        }
    }
}