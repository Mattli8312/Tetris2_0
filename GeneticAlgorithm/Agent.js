/**
 * Imported Functions
 */
class Agent{
    constructor(hybrid = false, newgenes = {ch: 0, r: 0, h: 0, cl: 0}){
        //These are the corresponding weights
        // + weights
        var factor = 10;
        this.connected_holes = !hybrid ? (Math.random() * factor).toPrecision(4): newgenes.h;
        this.roughness = !hybrid ? (Math.random() * factor).toPrecision(4): newgenes.r;
        this.height = !hybrid ? (Math.random() * factor).toPrecision(4): newgenes.h;
        // - weights
        this.clearable_lines = !hybrid ? (Math.random() * -1 * factor).toPrecision(4): newgenes.cl;
        //Used to store the potential moves and their scores
        this.potential_moves = [];
        //Game states
        this.inPlay = false;
        this.fitness = 0;
    }
    /**
     * Used to analyze the heuristic of every move combination
     */
    /**
     * Center the piece at each of these locations and continue rotating
     * until you don't have a collision: then that becomes one of your
     * potential moves
     * 0 1 2 3 4 5 6 7 8 9 
     */
    /**
     * CalculateHeight is used to compute the total height of the board
     * optimized with binary search
     */
    CalculateHeight(){
        var l = 0, r = 19;
        while(l <= r){
            var mid = l + Math.floor((r-l)/2);
            var exists = false;
            for(var b = 0; b < width; b++){
                if($('#'+mid+'a'+b).attr('type') != 'tile') {
                    exists = true; 
                    break;
                }
            }
            if(exists) r = mid - 1;
            else l = mid + 1;
        }
        return height - l;
    }
    /**
     * 1 pass system which calculates the number of holes, divits,
     *  and clearable_lines; Optimized to analyze board within frame 
     * defined by the current height of the board.
     */
    CalculateHoles(row){
        var divits = 0;
        var holes = 0, hole_tracker = new Array(10).fill(false);
        var clearables = 0;
        /**
         * To calculate divits, we need to calculate the changes in cell type
         * To calculate clearables, count the number of tiles that contain ten tetriminos
         * To calculate the number of holes, We will have to do it dynamically.
         */
        for(var i = row; i < height; i++){
            var count = 0;
            var valley = false;
            for(var j = 0; j < width; j++){
                //Calculate divits
                var current_tile = $('#' + i + 'a' + j);
                if(!j && current_tile.attr('type') != 'tile'){
                    valley = false;
                }
                else if(!valley && current_tile.attr('type') == 'tile'){
                    divits++;
                    valley = true;
                }
                //Calculate holes;
                if(current_tile.attr('type') != 'tile'){
                    hole_tracker[j] = true;
                }
                else if(hole_tracker[j]){
                    holes++;
                    hole_tracker[j] = false;
                }
            }
            if(count == 10) clearables ++;
        }
        return {d: divits, h: holes, c: clearables};
    }
    CalculateWeights(b){
        /**@todo */
        //First calculate the height and multiply by the weight;
        var current_weight = 0;
        var current_height = this.CalculateHeight();
        var rem = this.CalculateHoles(height - current_height);
        current_weight += current_height * this.height;
        current_weight += rem.d * this.roughness + rem.h * this.height + rem.c * this.clearable_lines;
        var move = {i: x, rot: b, weight: current_weight};
        this.potential_moves.push(move);
    }
    CalculateMoves(){
        Render_piece(false);
        //Check if we cleared a row
        if(ClearRows()) this.fitness += 100;
        //Base cases: pieces centered between 1 and 8
        //Edge cases: pieces centered at 0 and 9
        var b;
        for(b = 0; b < permutations; b++){
            for(var a = -2; a < 9; a++){
                y = 0; x = a;
                if(!Collision()){
                    while(!Collision()){ 
                        y++;
                    }
                    y--;
                    /**
                     * Now with the new updated board, 
                     * we will calculate the weights
                     */
                    Render_piece();
                    this.CalculateWeights(b);
                    Render_piece(false);
                }
            }
            Rotate_piece();
        }
        /**
         * Check if We are still in play
         */
        //Auto correct to main position
        while(b < 4){
            Rotate_piece();
            b++;
        }
        //Obtain the optimal move
        var result_ = this.OptimalMove();
        var rot_val = 0;
        while(x != result_.i){
            x += result_.i > x ? 1 : -1;
        }
        while(rot_val < result_.rot){
            Rotate_piece();
            rot_val++;
        }
        y = 0;
        while(!Collision()){ 
            y++;
        }
        y--;
        Render_piece();
        SelectRandom();
        this.potential_moves = [];
        y = 0; x = 4;
        Render_piece();
    }
    OptimalMove(){
        var min_ = null;
        for(const p of this.potential_moves){
            if(!min_) min_ = p;
            else if(p.weight < min_.weight) min_ = p;
        }
        return min_;
    }
}
