var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n/g)
    .forEach(element => {
        var split = element.split(' ');
        input.push({ 
            [split[0]]: parseInt(split[1]),
            countExecuted: 0
        });

    })

// console.log(input);

var reboot = (input) => {
    var acc = 0;

    for (i = 0; i < input.length; i++) {
        console.log('I: ' + i)
        bootCode = input[i];
        if (bootCode.countExecuted !== 0) {
            return acc;
        }

        if ('acc' in bootCode) { 
            acc += bootCode.acc;
        }
        if ('jmp' in bootCode) { 
            i += bootCode.jmp - 1; 
        }
        if ('nop' in bootCode) {}
        bootCode.countExecuted++;
    }

    return acc;
}

console.log('Puzzle 1: ' + reboot(input)); // 5 in example