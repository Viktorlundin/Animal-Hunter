class Player {

    public id: string;
    public time: number; //Last time for receiving data from the player. Used for timeout check.
    public x: number;
    public y: number;

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
}

export = Player;