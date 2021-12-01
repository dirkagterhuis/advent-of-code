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
            var occupiedNeigbourCount = countAdjacentOccupiedSeats(y, x);
            if (input[y][x] === 'L' && occupiedNeigbourCount === 0) {
                outputInput[y][x] = '#';
            } else if (input[y][x] === '#' && occupiedNeigbourCount >= 4) {
                outputInput[y][x] = 'L';
            }
            if (outputInput[y][x] === '#') { totalSeatsOccupied++; }
        }
    }
    input = JSON.parse(JSON.stringify(outputInput));
    return totalSeatsOccupied;
}

var countAdjacentOccupiedSeats = (y, x) => {
    var occupiedNeigbourCount = 0;
    try { if (input[y + 1][x - 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y + 1][x    ] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y + 1][x + 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y    ][x - 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y    ][x + 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y - 1][x - 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y - 1][x    ] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    try { if (input[y - 1][x + 1] === '#') { occupiedNeigbourCount++; } } catch (error) {}
    return occupiedNeigbourCount;
}

// improve by differentiating between seat plan before and after one simulation. Stop the loop when they are equal.
var simulate = (n) => {
    var numberOfSeatsOccupied = 0;
    for (i = 0; i <= n; i++) {
        numberOfSeatsOccupied = applyRules();
    }
    return numberOfSeatsOccupied;
}

console.log('Puzzle 1: ' + simulate(90)); // example: 37 // 2166 after 90 simulations
// console.table(input);
