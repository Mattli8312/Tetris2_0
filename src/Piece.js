const t_piece = [[0,1,0],[1,1,1],[0,0,0]]
const s_piece = [[0,1,1],[1,1,0],[0,0,0]]
const z_piece = [[1,1,0],[0,1,1],[0,0,0]]
const o_piece = [[1,1],[1,1]]
const j_piece = [[1,0,0],[1,1,1],[0,0,0]]
const l_piece = [[1,1,1],[1,0,0],[0,0,0]]
const i_piece = [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]
const pieces = [[t_piece,"t_piece"],
                [s_piece,"s_piece"],
                [z_piece,"z_piece"],
                [o_piece,"o_piece"],
                [j_piece,"j_piece"],
                [l_piece,"l_piece"],
                [i_piece,"i_piece"]];
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

function Render_piece(render = true){
    for(var a = 0; a < current_piece.length; a++){
        for(var b = 0; b < current_piece[0].length; b++){
            var string = "#" + (a+y).toString() + (b+x).toString();
            var type = render ? current_type : "tile";
            if(current_piece[a][b]) $(string).attr('type', type);
        }
    }
}

function Collision(){
    for(var a = 0; a < current_piece.length; a++){
        for(var b = 0; b < current_piece[0].length; b++){
            var string = "#" + (a+y).toString() + (b+x).toString();
            if(current_piece[a][b])
                if($(string).attr('type') != 'tile' || a >= height){
                    return true;
                }
        }
    }
    return false;
}

function ClearRows(){
    var stack = [], y = height - 1;
    for(var a = height - 1; a > -1; a--){
        var curr_row = [];
        for(var b = 0; b < width; b++){
            if($("#" + a.toString() + b.toString()).attr("type") != "tile"){
                curr_row.push($("#" + a.toString() + b.toString()));
            }
        }
        if(curr_row.length > 9){
            for(const c of curr_row)
                c.attr("type","tile");
        }
        else if(curr_row.length) stack.push(curr_row);
    }
    while(stack.length){
        var curr_row = stack[0];
        stack.splice(0,1);
        if(curr_row[0].attr("type")[1] == y.toString()) { y-- ; continue}
        else{
            for(const c of curr_row){
                var prev_type = c.attr('type'); c.attr("type", "tile");
                $("#"+y.toString()+c.attr("id")[2]).attr("type", prev_type); 
            }
            y--;
        }
    }
}