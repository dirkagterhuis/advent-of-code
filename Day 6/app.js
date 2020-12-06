var fs = require('fs');

// first used a set for puzzle #1, but for puzzle #2 found another way. Still, keeping this. You know. For one day. 
// var input = new Array();
// fs.readFileSync('./input.txt', 'utf-8')
//     .trim()
//     .replace(/\r\n/g, '\n')
//     .split(/\n{2,}/g)
//     .forEach(allGroupsAnswers => {
//         var uniqueAnswers = new Set();
//         allGroupsAnswers.replace(/\n/g, '').split('').forEach(answer =>{
//             uniqueAnswers.add(answer);
//         });
//         input.push(uniqueAnswers);
//         countAnyone = countAnyone + uniqueAnswers.size;
//     });

var countEveryone = 0;
var countAnyone = 0;
fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/g)
    .forEach(allGroupsAnswers => {
        allGroupsAnswers = allGroupsAnswers.split(/\n/g);
        var numberOfPeopleInGroup = allGroupsAnswers.length;
        
        var allAnswersWithCount = new Object();
        allGroupsAnswers.forEach(personAnswers => {
            personAnswers.split('').forEach(answer => {
                if (answer in allAnswersWithCount) {
                    allAnswersWithCount[answer] = allAnswersWithCount[answer] + 1;    
                } else {
                    allAnswersWithCount[answer] = 1;
                }
            });
        });

        for (var property in allAnswersWithCount) {
            countAnyone++;
            if (allAnswersWithCount[property] == numberOfPeopleInGroup) {
                countEveryone++;
            }
        }
    });

console.log('Puzzle One - Total count number of questions answered with Yes for anyone in group: ' + countAnyone); // 6382
console.log('Puzzle Two - Total count number of questions answered with Yes for everyone in group: ' + countEveryone); // 3197
