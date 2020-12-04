var fs = require('fs');

var input = new Array();
var startCoordinateX = 0;
var startCoordinateY = 0;

fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        input.push(element.split(''));
    });

// Access first row, (vertical) then column (horizontal) or access [x,y]: x = vertical, y = horizontal:
// console.log(input[2][1]);
// console.table(input);

function puzzleOne(slopeRight, slopeDown) {
    let treeCount = 0;
    let y = startCoordinateY;
    for (x = startCoordinateX + slopeDown; x <= input.length - 1; x = x + slopeDown) {
        y = y + slopeRight;
        if (input[x][y % input[x].length] == '#') {
            treeCount++
        }
    }
    return treeCount;
}

console.log('Puzzle One: # of trees = ' + puzzleOne(3,1));
console.log('Puzzle Two: # of trees = ' + puzzleOne(1, 1) * puzzleOne (3, 1) * puzzleOne(5, 1) * puzzleOne(7, 1) * puzzleOne(1, 2));