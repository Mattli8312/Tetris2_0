/**
 * Utility function used for debugging
 */
 function PrintBoard(){
    var board = [];
    for(var a = 0; a < height; a++){
        var row = [];
        for(var b = 0; b < width; b++){
            row.push($("#"+a+'a'+b).attr('type') != 'tile' ? '1' : '0');
        }
        board.push(row);
    }
    console.log(board);
}

async function TestAlgorithm(){
    var a1 = new Agent();
    console.log(a1);
    while(a1.inPlay){
        a1.CalculateMoves();
        if(a1.CalculateHeight() == height) a1.inPlay = false;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log(a1.fitness);
}

