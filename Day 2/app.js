var fs = require('fs');

var input = new Array();
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(/[\r\n]+/g)
    .forEach(element => {
        var pieces = element.split(' ');
        input.push({
            passwordPolicy: {
                characterRequirement: pieces[1].replace(':', ''),
                characterMinAllowed: parseInt(pieces[0].split('-')[0]),
                characterMaxAllowed: parseInt(pieces[0].split('-')[1])
            },
            password: pieces[2]
        });
    });

function puzzleOne() {
    var validPasswords = 0;
    input.forEach(element => {
        passwordWithoutCharacterRequirement = element.password
            .split(element.passwordPolicy.characterRequirement).join('');
        numberOfCharacterOccurences = element.password.length - passwordWithoutCharacterRequirement.length;
    
        if (numberOfCharacterOccurences >= element.passwordPolicy.characterMinAllowed && 
            numberOfCharacterOccurences <= element.passwordPolicy.characterMaxAllowed)
        {
            validPasswords++;
        }
    });
    return validPasswords;
}

function puzzleTwo() {
    var validPasswords = 0;
    input.forEach(element => {
        requiredChar = element.passwordPolicy.characterRequirement;
        char1Match = requiredChar == element.password.charAt(element.passwordPolicy.characterMinAllowed - 1);
        char2Match = requiredChar == element.password.charAt(element.passwordPolicy.characterMaxAllowed - 1);
        if (char1Match && char2Match) return;
        if (char1Match || char2Match) {
            validPasswords++
        }
    });
    return validPasswords;
}

console.log('Puzzle One: ' + puzzleOne());
console.log('Puzzle Two: ' + puzzleTwo());