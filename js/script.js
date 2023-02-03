"use strict";

const verbsLocation = "data/verbs.csv"

// ------------------------

var verbList = [];
  
// Load data
d3.csv(verbsLocation, function(data) {
    verbList.push(data.word)
}).then(setWords)

function setWords() {
    // Data is loaded

    // Pick random words
    let word1 = verbList.random();
    
    // Get words that start with the same letter as word 1
    let filteredWords = verbList.filter((word) => word[0] === word1[0]);

    // Get words that are not already chosen as words
    let word2 = filteredWords.filter((word) => word !== word1).random();
    let word3 = filteredWords.filter((word) => word !== word1 && word !== word2).random();

    word1 += ", ";
    word2 += ", ";

    let wordData = (word1 + word2 + word3).split("")
    
    // Set Text + Animation
    // Each letter gets its own span
    let letterContainer = d3.select("#word-container").selectAll(".letter-container").data(wordData).join("span");

    // For each letter container span
    letterContainer.each(function(letter, j) {
        
        d3.select(this)
        .attr("class", "letter-container")
        .style("position", "relative")
        .text(d => d)
        .interrupt()
            .style("opacity", 0)
            .style("bottom", "45px")
            .transition()
                .style("opacity", 1)
                .style("bottom", "0px")
                .ease(d3.easeBackOut)
                .duration(300 + j * 30);
    });
        

        

        

}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

