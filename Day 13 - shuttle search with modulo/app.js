const { time } = require('console');
var fs = require('fs');

var split = fs.readFileSync('./input.txt', 'utf-8').split(/[\r\n]+/g);
var timeToCatchTheBus = split[0];
var busDurations = split[1]
    .replace(/,x/g, '')
    .split(',')
    .map((i) => Number(i));

console.log('timeToCatchTheBus: ' + timeToCatchTheBus);
console.log('busDurations: ' + busDurations);

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