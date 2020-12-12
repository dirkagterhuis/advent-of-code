var fs = require('fs');

var input = new Array();
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/g)
    .forEach(element => {
        var passport = new Object();
        element.split('\n')
            .join(' ')
            .split(' ')
            .forEach(innerElement => {
                var innerPiece = innerElement.split(':');
                passport[innerPiece[0]] = innerPiece[1];
            })
        input.push({ passport }); // later: try to just push the passport, not the object of a passport as this is probably the cause of the objet name being in the array
    });

function puzzleOne() {
    var validPassportCount = 0;
    input.forEach(passportToCheck => {
        var actualPassport = passportToCheck.passport
        if (actualPassport.byr && actualPassport.iyr && actualPassport.eyr && actualPassport.hgt && actualPassport.hcl && actualPassport.ecl && actualPassport.pid) {
            validPassportCount++; 
        }        
    });
    return validPassportCount;
}

function puzzleTwo() {
    var validPassportCount = 0;
    for (i = 0; i < input.length; i++) {
        var passport = input[i].passport;
        if (!passport.byr || !passport.iyr || !passport.eyr || !passport.hgt || !passport.hcl || !passport.ecl || !passport.pid) {
            continue;
        }        
        if (parseInt(passport.byr) < 1920 || parseInt(passport.byr) > 2002) { continue; }
        if (parseInt(passport.iyr) < 2010 || parseInt(passport.iyr) > 2020) { continue; }
        if (parseInt(passport.eyr) < 2020 || parseInt(passport.eyr) > 2030) { continue; }
        var unit = passport.hgt.slice(passport.hgt.length - 2);
        var unitValue = passport.hgt.slice(0, -2); 
        if (!['cm','in'].includes(unit)) { continue; }
        if (unit == 'cm' && (unitValue < 150 || unitValue > 193)) { continue; }
        if (unit == 'in' && (unitValue < 59 || unitValue > 76)) { continue; }
        if (!passport.hcl.match(/^#[0-9A-F]{6}$/i)) { continue; } 
        if (!['amb', 'blu', 'brn','gry','grn','hzl','oth'].includes(passport.ecl)) { continue; }
        if (!passport.pid.match(/^[0-9]{9}$/i)) { continue; } 
        validPassportCount++;
    }
    return validPassportCount;
}

console.log('Puzzle One:' + puzzleOne()); // 222
console.log('Puzzle Two:' + puzzleTwo()); // 140