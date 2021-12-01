var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach(element => {
        var split = element.split(/([0-9]+)/);
        input.push({
            operation: split[0],
            value: parseInt(split[1])
        });
    }
);
// console.log(input);

var getLocation1 = () => {
    var x = 0;
    var y = 0;
    var angle = 0;
    
    input.forEach(instruction => {
        if (instruction.operation === 'W') { x -= instruction.value; }
        if (instruction.operation === 'E') { x += instruction.value; }
        if (instruction.operation === 'S') { y -= instruction.value; }
        if (instruction.operation === 'N') { y += instruction.value; }
        if (instruction.operation === 'L') { angle += instruction.value }
        if (instruction.operation === 'R') { angle -= instruction.value }
        if (instruction.operation === 'F') { 
            x += instruction.value * Math.cos(angle * Math.PI / 180);
            y += instruction.value * Math.sin(angle * Math.PI / 180);
         }
    })
    return (Math.round(Math.abs(x) + Math.abs(y)));
}

console.log('Puzzle1: ' + getLocation1()); // 445 or 25 for example

var getLocation2 = () => {
    var shipX = 0;
    var shipY = 0;
    var wayPointX = 10;
    var wayPointY = 1;
    var angleDirection;
    
    input.forEach(instruction => {
        var deltaX = wayPointX - shipX;
        var deltaY = wayPointY - shipY;
        if (instruction.operation === 'W') { wayPointX -= instruction.value; }
        if (instruction.operation === 'E') { wayPointX += instruction.value; }
        if (instruction.operation === 'S') { wayPointY -= instruction.value; }
        if (instruction.operation === 'N') { wayPointY += instruction.value; }
        if (instruction.operation === 'L') { angleDirection = 1; } 
        if (instruction.operation === 'R') { angleDirection = -1; } 
        if (instruction.operation === 'L' || instruction.operation === 'R') {
            // science bitch: vector rotation
            wayPointX = shipX 
                + deltaX * Math.cos(angleDirection * instruction.value * Math.PI / 180) 
                - deltaY * Math.sin(angleDirection * instruction.value * Math.PI / 180);
            wayPointY = shipY 
                + deltaX * Math.sin(angleDirection * instruction.value * Math.PI / 180) 
                + deltaY * Math.cos(angleDirection * instruction.value * Math.PI / 180);
        }
        if (instruction.operation === 'F') { 
            shipX += instruction.value * deltaX;
            shipY += instruction.value * deltaY;
            wayPointX += instruction.value * deltaX;
            wayPointY += instruction.value * deltaY;
         }
    })
    return (Math.round(Math.abs(shipX) + Math.abs(shipY)));
}

console.log('Puzzle2: ' + getLocation2()); // 42495 or 286 for example
