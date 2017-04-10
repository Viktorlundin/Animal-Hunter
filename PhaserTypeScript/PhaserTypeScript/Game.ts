class GameForFour {
    public players: any = new Array(4);

    public constructor() {
        for (var i = 0; i < this.players.length; i++){
            this.players[i] = null;
        }
    }

    public search_id(id: string) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] != null) {
                if (this.players[i].check_id(id))
                    return i;
            }
        }
        return -1;
    }

    public search_empty() {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] != null) {
                return i;
            }
        }
        return -1;
    }
}

export = GameForFour;