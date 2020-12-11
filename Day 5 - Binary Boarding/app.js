var fs = require('fs');

var numberOfRows = 128;
var numberOfColums = 8;
var input = [];
var seats = [];

for (i = 0; i <= numberOfRows -1; i++) {
    var row = [];
    for (j = 0; j <= numberOfColums -1; j++) {
        row.push('');
    }
    seats.push(row);
}

// Example input: 'FBFBBFFRLR'. Row: 44, Column: 5, seatId: 44 * 8 + 5 = 357
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        input.push(element);
    });

function boardThePlane() {
    input.forEach(boardingPass => {
        var row = numberOfRows;
        var column = numberOfColums;
        powerRow = Math.log(numberOfRows) / Math.log(2) - 1;
        powerColumn = Math.log(numberOfColums) / Math.log(2) - 1;

        boardingPass.split('')
            .forEach(char => {
                if (char == 'F') { row = row - Math.pow(2, powerRow); }
                if (['F','B'].includes(char) ) { powerRow--; }
                if (char == 'L') { column = column - Math.pow(2, powerColumn); }
                if (['L','R'].includes(char)) { powerColumn--; }
            });
            
        rowIndex = row - 1;
        columnIndex = column - 1;
        var seatId = rowIndex * 8 + columnIndex;
        // console.log(input[2][1]); [x,y]: x = vertical, y = horizontal:
        seats[rowIndex][columnIndex] = seatId;
    })
}

function getMySeat() {
    var allSeats = [];
    var mySeat;
    seats.forEach(row => {
        allSeats = [...allSeats, ...row];
    });
    for (i = 1; i <= allSeats.length - 1; i++) {
        if (allSeats[i] == '' && allSeats[i - 1] != '' && allSeats[i + 1] != '') {
            mySeat = allSeats[i - 1] + 1;
            break;
        }
    }
    return mySeat;
}

boardThePlane();
console.table(seats);
console.log('The highest Seat Id is: ' + Math.max(...[].concat(...seats))); // should be 894
console.log('My seat is: ' + getMySeat()); // should be 579