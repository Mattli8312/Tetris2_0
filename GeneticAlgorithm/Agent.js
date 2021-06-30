class Agent{
    constructor(){
        //These are the corresponding weights
        this.connected_holes = Math.floor(Math.random() * -5) + 1;
        this.roughness = Math.floor(Math.random() * -5) + 1;
        this.clearable_lines = Math.floor(Math.random() * -5) - 1;
        this.height = Math.floor(Math.random() * 5) + 1;
    }
    /**
     * Center the piece at each of these locations and continue rotating
     * until you don't have a collision: then that becomes one of your
     * potential moves
     * 0 1 2 3 4 5 6 7 8 9 
     */
    CalculateMoves(){
        Render_piece(false);
        var count = 0;
        //Base cases: pieces centered between 1 and 8
        //Edge cases: pieces centered at 0 and 9
        for(var a = -1; a < 9; a++){
            var bound = (a == -1) || (a == 8) ? 4 : permutations; x = a;
            for(var b = 0; b < bound; b++){
                if(!Collision()) {
                    Render_piece();
                    PrintBoard();
                    count++;
                }
                Render_piece(false);
                Rotate_piece();
            }
            while(bound < 4){
                Rotate_piece(); bound++;
            }
        }
        console.log(count);
    }
}
var a1 = new Agent();
a1.CalculateMoves();