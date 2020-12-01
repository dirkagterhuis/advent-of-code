var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(/[\r\n]+/g)
    .map(x => +x);

let result;
for (i = 0; i <= input.length; i++) {
    for (j = 0; j <= input.length; j++) {
        if (i == j) { continue; }
        if (input[i] + input[j] == 2020) {
            console.log('Element 1: ' + input[i]);
            console.log('Element 2: ' + input[j]);
            result = input[i] * input[j];
        }
    }
    if (result) { break; }
}
console.log(result);