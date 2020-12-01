var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(/[\r\n]+/g)
    .map(x => +x);

let result;
for (i = 0; i <= input.length; i++) {
    for (j = 0; j <= input.length; j++) {
        if (i == j) { continue; }
        for (k = 0; k < input.length; k++) {
            if (j == k) { continue; }
                if (input[i] + input[j] + input[k] == 2020) {
                    console.log('Element 1: ' + input[i]);
                    console.log('Element 2: ' + input[j]);
                    console.log('Element 3: ' + input[k]);
                    result = input[i] * input[j] * input[k];
                }
            }
        if (result) { break; }
        }
}
console.log(result);