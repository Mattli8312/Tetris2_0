/**
 * GeneticAlgorithm Class will store the number of generations and size of each generation
 * and contain that amount of agents in it's list.
 */
class GeneticAlgorithm{
    constructor(generations = 3, populationSize = 10){
        this.gens = generations;
        this.popsize = populationSize;
        /**
         * Initialize the list of agents as a new Array of agents
         */
        this.agents = [];
        this.selector_array = [];
        this.newgenes = [];
        /**
         * Initialize the selector array;
         */
        for(var a = 0; a < populationSize; a++){
            for(var b = 0; b <= a; b++){
                this.selector_array.push(a);
            }
        }
        console.log(this.selector_array);
    }
    Select(){
        /**@todo */
        //Sort the agents based on fitness, best being at the end and worst in the front
        this.agents.sort((a, b) => (a.fitness > b.fitness) ? 1 : -1);
        this.newgenes = [];
        /**
         * For the case of selection, we need to increase procreation amongst agents with higher 
         * Fitnesses, hence we give those agents higher probabilities of maiting
         */
        for(var a = 0; a < this.popsize; a++){
            // var probability_size = this.selector_array.length;
            // var mom = this.selector_array[Math.floor(Math.random() * probability_size)];
            // var dad = this.selector_array[Math.floor(Math.random() * probability_size)];
            // this.CrossOver(mom, dad);
            var best_agent = this.agents[this.agents.length - 1];
            var new_gene = {ch: best_agent.connected_holes, r: best_agent.roughness, h: best_agent.height, cl: best_agent.clearable_lines};
            this.newgenes.push(new_gene);
        }
        this.agents = [];
    }
    CrossOver(mom, dad){
        /**@todo */
        /**
         * The way crossOver will work in this implementation is that we will /**@todo */
        var new_genes = {ch: 0, r: 0, h: 0, cl: 0}; //Representing the new genes
        var mom_genes = this.agents[mom], dad_genes = this.agents[dad];
        var m_perc = (mom/(mom+dad)).toPrecision(3);
        var d_perc = 1 - m_perc;
        new_genes.ch = (parseFloat(mom_genes.connected_holes * m_perc + dad_genes.connected_holes * d_perc)).toPrecision(4);
        new_genes.r = (parseFloat(mom_genes.roughness * m_perc + dad_genes.roughness * d_perc)).toPrecision(4);
        new_genes.h = (parseFloat(mom_genes.height * m_perc + dad_genes.height * d_perc)).toPrecision(4);
        new_genes.cl = (parseFloat(mom_genes.clearable_lines * m_perc + dad_genes.clearable_lines * d_perc)).toPrecision(4);
        this.newgenes.push(new_genes);
    }
    Mutate(){
        /**@todo */
    }
}