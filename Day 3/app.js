var fs = require('fs');

var mapMultiplier = 13;
var input = new Array();
var startCoordinateX = 0;
var startCoordinateY = 0;

fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        toPush = element.split('');
        for (i = 0; i < mapMultiplier - 1; i++) {
            toPush.push(...toPush);
        }
        input.push(toPush);
    });

// Access first row, (vertical) then column (horizontal) or access [x,y]: x = vertical, y = horizontal
// console.log(input[2][1]);

function puzzleOne(slopeRight, slopeDown) {
    let treeCount = 0;
    let y = startCoordinateY;
    for (x = startCoordinateX + slopeDown; x <= input.length - 1; x = x + slopeDown) {
        y = y + slopeRight;
        if (input[x][y] == '#') {
            treeCount++
        }
    }
    return treeCount;
}

console.log('Puzzle One: # of trees = ' + puzzleOne(3,1));
var puzzleTwo = puzzleOne(1, 1) * puzzleOne (3, 1) * puzzleOne(5, 1) * puzzleOne(7, 1) * puzzleOne(1, 2);
console.log('Puzzle Two: ' + puzzleTwo);