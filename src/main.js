const width = 10;
const height = 20;

var score, current_piece, current_type;
var x, y;
var clk;

function Initialize_board(){
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var tile = $("<div type='tile' block='true'></div>").attr('id', i.toString() + j.toString());
            $("#grid").append(tile);
        }
    }
}

function SelectRandom(){
    var sel = Math.floor(Math.random()*7)
    current_piece = pieces[sel][0]; current_type = pieces[sel][1];
}

function Main(){
    //Choose random piece
    SelectRandom();
    if(clk) clearInterval(clk);
    clk = setInterval(()=>{
        Render_piece(false); y++;
        if(Collision()){ 
            y--; 
            Render_piece();
            SelectRandom();
            y = 0; x = 4;
            ClearRows();
        }
        Render_piece();
    }, 250);
    score = 0;
    y = 0; x = 4;
    current_piece = t_piece;
    Initialize_board();
    Render_piece();
}

window.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "ArrowUp": 
            Render_piece(false);
            Rotate_piece();
            if(Collision()) for(var a = 0; a < 3; a++) Rotate_piece(); //If you can't rotate, undo the effects
            Render_piece();
            break;
        case "ArrowLeft":
            Render_piece(false); x--;
            if(Collision()) x++;
            Render_piece();
            break;
        case "ArrowRight": 
            Render_piece(false); x++;
            if(Collision()) x--;
            Render_piece();
            break;
    }
})
Main();