var fs = require('fs');

var numberOfRows = 128;
var numberOfColums = 8;
var input = new Array();
var seats = new Array();
for (i = 0; i <= numberOfRows -1; i++) {
    var row = new Array();
    for (j = 0; j <= numberOfColums -1; j++) {
        row.push('');
    }
    seats.push(row);
}

// console.table(seats);
// Example input: 'FBFBBFFRLR'. Row: 44, Column: 5, seatId: 357
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        input.push(element);
    });

function boardThePlane() {
    input.forEach(boardingPass => {
        var row = numberOfRows;
        var column = numberOfColums;
        
        powerRow = 6;
        powerColumn = 2;
        for (i = 0; i <= boardingPass.length; i++) {
            var char = boardingPass.charAt(i);
            if (char == 'F') { row = row - Math.pow(2, powerRow); }
            if (['F','B'].includes(char) ) { powerRow--; }
            if (char == 'L') { column = column - Math.pow(2, powerColumn); }
            if (['L','R'].includes(char)) { powerColumn--; }
        }
        rowIndex = row - 1;
        columnIndex = column - 1;
        var seatId = rowIndex * 8 + columnIndex;
        // console.log(input[2][1]); [x,y]: x = vertical, y = horizontal:
        seats[rowIndex][columnIndex] = seatId;
    })
}

// ok this doesn't work yet. 
function getMySeat() {
    var allSeats = [];
    var mySeat;
    seats.forEach(row => {
        allSeats = [...allSeats, ...row];
    });
    console.log('allseats: ' + JSON.stringify(allSeats));
    for (i = 1; i <= allSeats.length - 1; i++) {
        if (allSeats[i = ''] && allSeats[i - 1] != '' && allSeats[i + 1] != '') {
            mySeat = allSeats[i - 1] + 1;
            console.log('I: ' + i);
            console.log('I in ding: ' + allSeats[i]);
            console.log('I in ding - 1: ' + allSeats[i - 1]);
            break;
        }
    }
    return mySeat;
}

boardThePlane();
console.table(seats);
var max = Math.max(...[].concat(...seats))
console.log('The highest Seat Id is: ' + max);
console.log('mySeat is: ' + getMySeat());