const { time } = require('console');
var fs = require('fs');

var split = fs.readFileSync('./inputExample.txt', 'utf-8').split(/[\r\n]+/g);
var timeToCatchTheBus = split[0];
var busDurations = split[1]
    .replace(/,x/g, '')
    .split(',')
    .map((i) => Number(i));
var busDurationsWithX = split[1].split(',');
busDurationsWithX.forEach(duration => {
    if (duration !== 'x') { duration = parseInt(duration); }
});

console.log('timeToCatchTheBus: ' + timeToCatchTheBus);
console.log('busDurations: ' + busDurations);
console.log('busDurationsWithX: ' + busDurationsWithX);

var getMyBus = () => {
    var busByNextDepart = [];
    busDurations.forEach(busDuration => {
        var timeToWait = busDuration - timeToCatchTheBus % busDuration;
        busByNextDepart.push({
            busDuration, timeToWait
        });
    })

    var earliestBus = busByNextDepart[0];
    for (i = 1; i < busByNextDepart.length; i++) {        
        if (busByNextDepart[i].timeToWait === earliestBus.timeToWait) {
            throw new Error('more than 1 bus man.');
        }
        if (busByNextDepart[i].timeToWait < earliestBus.timeToWait) {
            earliestBus = busByNextDepart[i];
        }
    }
    console.log('earliestBus: ' + JSON.stringify(earliestBus));
    return earliestBus.busDuration * (earliestBus.timeToWait)
}

console.log('Puzzle 1: ' + getMyBus()); // 5257 or 295 in example
console.log('***');

//forget it
var puzzleTwo = () => {
    var found = false;
    allNumbers:
    for (i = 1; !found; i++) {
        console.log('i: ' + i)
        for (j = 0; j <= busDurationsWithX.length; j++) { // all busDurationsWithX is the 'vertical' 1st column
        if (busDurationsWithX === 'x') { continue; }
        var currentTime = i + j;
        var busDuration = busDurationsWithX[j];
        if (busDuration - currentTime % busDuration !== 0)
            continue allNumbers;
        }
        return currentTime;
    }
}

console.log('Puzzle 2: ' + puzzleTwo());