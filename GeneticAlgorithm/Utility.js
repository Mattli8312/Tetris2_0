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
    for(var a = 0; a < 5; a++){
        a1.CalculateMoves();
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

