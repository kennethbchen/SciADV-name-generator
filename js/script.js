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
}).then(function() {
    // Data is loaded

    // Pick random word
    
    let word1 = verbList.random();

    // Get words that start with the same letter as word 1
    let filteredWords = verbList.filter((word) => word[0] === word1[0]);

    // Get words that are not already chosen as words
    let word2 = filteredWords.filter((word) => word !== word1).random();
    let word3 = filteredWords.filter((word) => word !== word1 && word !== word2).random();

    word1Span.innerHTML = word1;
    word2Span.innerHTML = word2;
    word3Span.innerHTML = word3;
})

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

