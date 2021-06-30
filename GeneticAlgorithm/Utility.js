/**
 * Utility function used for debugging
 */
 function PrintBoard(){
    var board = [];
    for(var a = 0; a < 4; a++){
        var row = [];
        for(var b = 0; b < width; b++){
            row.push($("#"+a+'a'+b).attr('type') != 'tile' ? '1' : '0');
        }
        board.push(row);
    }
    console.log(board);
}
