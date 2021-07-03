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
    var a1 = new GeneticAlgorithm();
    for(var g = 0; g < a1.gens; g++){
        generation_box.innerHTML = "Generation: " + (g+1);
        for(var i = 0; i < a1.popsize; i++){
            Reset_board();
            Initialize_board();
            agent_ = !g ? new Agent() : new Agent(true, a1.newgenes[i]);
            agent_.inPlay = true;
            agent_box.innerHTML = "Agent: " + (i + 1);
            while(agent_.inPlay){
                fitness_box.innerHTML = "Fitness: " + agent_.fitness;
                agent_.CalculateMoves();
                if(agent_.CalculateHeight() == height) agent_.inPlay = false;
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            console.log(agent_.fitness);
            a1.agents.push(agent_);
        }
        a1.Select();
    }
}

var agent_sub = new Agent();
function SubTest(){
    agent_sub.CalculateMoves();
}