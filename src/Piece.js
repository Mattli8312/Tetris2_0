/**
 * Pieces to be rendered
 */

//1 permutation
const o_piece = [[1,1],[1,1]]
//2 permutations
const s_piece = [[0,1,1],[1,1,0],[0,0,0]]
const z_piece = [[1,1,0],[0,1,1],[0,0,0]]
const i_piece = [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]
//4 permutations
const j_piece = [[1,0,0],[1,1,1],[0,0,0]]
const l_piece = [[1,1,1],[1,0,0],[0,0,0]]
const t_piece = [[0,1,0],[1,1,1],[0,0,0]]

const pieces = [[t_piece,"t_piece",4],
                [s_piece,"s_piece",2],
                [z_piece,"z_piece",2],
                [o_piece,"o_piece",1],
                [j_piece,"j_piece",4],
                [l_piece,"l_piece",4],
                [i_piece,"i_piece",2]];
/**
 * Rotate Piece using very simple combinational logic
 * 1 2 3            3 6 9
 * 4 5 6    =>      2 5 8
 * 7 8 9            1 4 7
 * @param None
 */
function Rotate_piece(){
    var result = [];
    for(var a = 0; a < current_piece.length; a++){
        var new_row = [];
        for(var b = current_piece[0].length-1; b > -1; b--){
            new_row.push(current_piece[b][a]);
        }
        result.push(new_row);
    }
    current_piece = result;
}
/**
 * Used to render piece in the html doc by accessing the x and y coordinate of 
 * the piece and rendering pixels corresponding to the shape of the current piece
 * @param render 
 */
function Render_piece(render = true, testing = false){
    for(var a = 0; a < current_piece.length; a++){
        for(var b = 0; b < current_piece[0].length; b++){
            var string = "#" + (a+y).toString() + 'a' + (b+x).toString();
            var type = render ? current_type : "tile";
            if(current_piece[a][b]) $(string).attr('type', type);
            if(testing) console.log($(string));
        }
    }
}

/**
 * Utility function used to determine if we collided into the walls, another piece
 * or the bottom of the game board
 * @returns A boolean variable seeing if we collided
 */
function Collision(){
    for(var a = 0; a < current_piece.length; a++){
        for(var b = 0; b < current_piece[0].length; b++){
            var string = "#" + (a+y).toString() + 'a' + (b+x).toString();
            if(current_piece[a][b])
                if($(string).attr('type') != 'tile'){
                    return true;
                }
        }
    }
    return false;
}
/**
 * Utility function used to clear any pieces and potential
 * tetris' and updates the board.
 * @param None
 */
function ClearRows(){
    var stack = [], y = height - 1;
    var clearing = false;
    for(var a = 0; a < height; a++){
        var curr_row = [];
        for(var b = 0; b < width; b++){
            if($("#" + a.toString() + 'a' + b.toString()).attr("type") != "tile"){
                curr_row.push($("#" + a.toString() + 'a' + b.toString()));
            }
        }
        if(curr_row.length > 9){
            clearing = true;
            for(const c of curr_row)
                c.attr("type","tile");
        }
        else if(curr_row.length) stack.push(curr_row);
    }
    while(stack.length){
        var curr_row = stack[stack.length-1];
        stack.pop();
        if(parseInt(curr_row[0].attr("id")[1]) == y){
            console.log(y); y--; continue;
        }
        for(const c of curr_row){
            let prev_ = c.attr("type"); c.attr("type","tile");
            $("#"+y.toString()+'a'+c.attr("id")[c.attr("id").length - 1]).attr("type", prev_);
        }
        y--;
    }
    return clearing;
}