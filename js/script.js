"use strict";

const verbsLocation = "data/verbs.csv"

const word1Span = document.getElementById("word1");
const word2Span = document.getElementById("word2");
const word3Span = document.getElementById("word3");

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

    let wordData = [word1.split(""),word2.split(""),word3.split("")]

    
    // Set Text + Animation
    let selection = d3.selectAll(".word-container").data(wordData);

    // For each word container span
    selection.each(function(word, i) {

        // Give every letter in the word it's own span
        let letterContainers = d3.select(this).selectAll(".letter-container").data(word).join("span")

        // For each letter container span
        letterContainers.each(function(letter, j) {
            
            // 
            d3.select(this)
            .attr("class", "letter-container")
            .style("position", "relative")
            .attr("position", j)
            .text( d => d)
            .interrupt()
                .style("opacity", 0)
                .style("bottom", "45px")
                .transition()
                    .style("opacity", 1)
                    .style("bottom", "0px")
                    .ease(d3.easeBackOut)
                    .duration((i + 1) * 300 + j * 25);
        });
        

        
    });
        

}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

