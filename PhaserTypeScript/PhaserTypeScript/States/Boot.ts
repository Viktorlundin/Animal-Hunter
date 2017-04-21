module JungleHunter {
    export class Boot extends Phaser.State {
 



        create() {
            console.log("works");
            this.stage.setBackgroundColor(0xFFFFFF);
            //this.setEventHandlers();
            this.game.state.start('Preloader', true, false);
            

        }
    }
}