var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        input.push(element.split(''));
});

// console.table(input);
// console.log(input[0][1]); // y = row = 0, x = column = 1 // '.'

var applyRules = () => {
    var totalSeatsOccupied = 0;
    var outputInput = JSON.parse(JSON.stringify(input));
    for (y = 0; y < input.length; y ++) {
        for (x = 0; x < input[y].length; x++) {
            var occupiedNeigbourCount = countVisibleOccupiedSeats(y, x);
            if (input[y][x] === 'L' && occupiedNeigbourCount === 0) {
                outputInput[y][x] = '#';
            } else if (input[y][x] === '#' && occupiedNeigbourCount >= 5) {
                outputInput[y][x] = 'L';
            }
            if (outputInput[y][x] === '#') { totalSeatsOccupied++; }
        }
    }
    input = JSON.parse(JSON.stringify(outputInput));
    return totalSeatsOccupied;
}

// it is very likely that this can be written more concise
var countVisibleOccupiedSeats = (y, x) => {
    var occupiedVisibleNeigbourCount = 0;
    for (right = x + 1; right < input[y].length; right++) { 
        if (input[y][right] === 'L') { break; }
        if (input[y][right] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break; 
        } 
    }
    for (left = x - 1; left >= 0; left--) {
        if (input[y][left] === 'L') { break; }
        if (input[y][left] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    for (up = y - 1; up >= 0; up--) { 
        if (input[up][x] === 'L') { break; }
        if (input[up][x] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    for (down = y + 1; down < input.length; down++) {
        if (input[down][x] === 'L') { break; }
        if (input[down][x] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    // upright
    for (up = y - 1, right = x + 1; up >= 0 && right < input[y].length; up--, right++) { 
        if (input[up][right] === 'L') { break; }
        if (input[up][right] === '#') {
            occupiedVisibleNeigbourCount++;
            break;
        } 
    }
    // downright
    for (down = y + 1, right = x + 1; down < input.length && right < input[y].length; down++, right++) { 
        if (input[down][right] === 'L') { break; }
        if (input[down][right] === '#') {
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    // upleft
    for (up = y - 1, left = x - 1; up >= 0 && left >= 0; up--, left--) { 
        if (input[up][left] === 'L') { break; }
        if (input[up][left] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    // downleft
    for (down = y + 1, left = x - 1; down < input.length && left >= 0; down++, left--) { 
        if (input[down][left] === 'L') { break; }
        if (input[down][left] === '#') { 
            occupiedVisibleNeigbourCount++; 
            break;
        } 
    }
    return occupiedVisibleNeigbourCount;
}

// improve by differentiating between seat plan before and after one simulation. Stop the loop when they are equal.
var simulate = (n) => {
    var numberOfSeatsOccupied = 0;
    for (i = 0; i <= n; i++) {
        numberOfSeatsOccupied = applyRules();
    }
    return numberOfSeatsOccupied;
}

console.log('Puzzle 2: ' + simulate(90)); // example: 26 // 1955 after 90 simulations
// console.table(input);
