var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n/g)
    .forEach(element => {
        input.push(parseInt(element));
    })
console.log(input)

// preamble ('aanloop'): after 25 numbers, number 26 is a sum of at 
// least 2 numbers in the preamble
var puzzle1I;
const decodePuzzle = (preambleLength) => {
    for (i = preambleLength; i < input.length; i++) {
        var preamble = [];
        for (j = i - preambleLength; j < i ; j ++) {
            preamble.push(input[j]);
        }
        var valid = false;
        
        for (j = 0; j < preamble.length; j++) {
            for(k = 0; k < preamble.length; k++) {
                if (j === k) { continue; }
                if (preamble[j] + preamble[k] === input[i]) {
                    valid = true;
                }
            }
        }
        if (!valid) { 
            puzzle1I = i;
            return input[i]; 
        }
    }
}

var preambleLength = 5; // 25 for real, 5 for example
console.log('Puzzle 1: Example: ' + decodePuzzle(5)); // 127 for example
console.log('puzzle1I : ' + puzzle1I)
console.log('Puzzle 1: fur real: ' + decodePuzzle(25)); // 15690279

var numberOne = decodePuzzle(25); // remember to set this to 25 or 5 for the example

var decodePuzzleTwo = () => {
    var preambleLength = 2;
    for (preambleLength - 1; preambleLength < puzzle1I; preambleLength++) {
        for (i = preambleLength; i < input.length; i++) {
            var preamble = [];
            for (j = i - preambleLength; j < i ; j ++) {
                preamble.push(input[j]);
            }
            var sum = preamble.reduce(function(a, b){
                return a + b;
            }, 0);
            if (sum === numberOne) {
                console.log('Found: ' + preamble);
                return Math.min(...preamble) + Math.max(...preamble);
            }
        }        
    }
}

console.log('Puzzle 2: example: ' + decodePuzzleTwo());