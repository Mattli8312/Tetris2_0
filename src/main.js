const width = 10;
const height = 20;

var score, current_piece, current_type;
var x, y, permutations;
var clk;

function Initialize_board(){
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var tile = $("<div type='tile' block='true'></div>").attr('id', i.toString() + 'a' + j.toString());
            $("#grid").append(tile);
        }
    }
}

function SelectRandom(){
    var sel = Math.floor(Math.random()*7)
    current_piece = pieces[sel][0]; current_type = pieces[sel][1], permutations = pieces[sel][2];
    console.log(permutations);
}

function StartClock(frequency){
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
    }, frequency);
}

function Main(){
    //Choose random piece
    SelectRandom();
    score = 0;
    y = 0; x = 4;
    Initialize_board();
    Render_piece();
    // StartClock(200);
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