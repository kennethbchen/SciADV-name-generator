"use strict";

const wordsLocation = "data/english-nouns.csv"

// ------------------------

var wordList = [];
  
// Load data
d3.csv(wordsLocation, function(data) {
    wordList.push(data.word)
}).then(setWords)

function setWords() {
    // Pick random words
    let word1 = wordList.random();
    let word2 = wordList.random();

    // Make words Title Case
    word1 = word1.charAt(0).toUpperCase() + word1.substring(1);
    word2 = word2.charAt(0).toUpperCase() + word2.substring(1);

    // Set Text + Animation
    // Each letter gets its own span
    let letterContainer = d3.select("#word-container").selectAll(".letter-container").data(`${word1};${word2}`).join("span");

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

