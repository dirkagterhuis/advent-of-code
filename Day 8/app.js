var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n/g)
    .forEach(element => {
        var split = element.split(' ');
        input.push({ 
            bootAction: split[0], 
            actionValue: parseInt(split[1]),
            countExecuted: 0
        });
    })

var reboot = (input, acc) => {
    for (i = 0; i < input.length; i++) {
            if (input[i].countExecuted !== 0) {
                return acc;
            }
            if (input[i].bootAction === 'acc') { 
                acc += input[i].actionValue;
            }
            if (input[i].bootAction === 'jmp') { 
                i += input[i].actionValue - 1; 
            }
            //if (input[i].bootAction === 'nop') {}
            input[i].countExecuted++;
        }
    return acc;
}

console.log('Puzzle 1: ' + reboot(input, 0)); // 5 in example // 1941

var reboot2 = (acc) => {
    for (j = 0; j < input.length; j++) {
        input.forEach(bootCode => {
            bootCode.countExecuted = 0;
        })

        if (input[j].bootAction === 'acc') { continue; }
        if (input[j].bootAction === 'jmp') { input[j].bootAction = 'nop'; }
        else if (input[j].bootAction === 'nop') { input[j].bootAction = 'jmp'; }

        acc = innerReboot(acc);
        if (acc) { return acc; }

        if (input[j].bootAction === 'jmp') { input[j].bootAction = 'nop'; }
        else if (input[j].bootAction === 'nop') { input[j].bootAction = 'jmp'; }        
    }
}

var innerReboot = (acc) => {
    for (i = 0; i <= input.length; i++) {
        if (i === input.length) { return acc; }
        if (input[i].countExecuted !== 0) {
            return null;
        }
        if (input[i].bootAction === 'acc') { 
            acc += input[i].actionValue;
        }
        if (input[i].bootAction === 'jmp') { 
            input[i].countExecuted++;
            i += input[i].actionValue - 1;
            continue; 
        }
        if (input[i].bootAction === 'nop') {}
        input[i].countExecuted++;
    }
}

console.log('Puzzle 2: ' + reboot2(0)); // 2096 or 8 in example
