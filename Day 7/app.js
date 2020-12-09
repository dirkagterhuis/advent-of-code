const { Console } = require('console');
var fs = require('fs');

var input = [];
fs.readFileSync('./inputExample2.txt', 'utf-8')
    .trim()
    .replace(/\r\n/g, '\n')
    .split(/\n/g)
    .forEach(element => {
        var childBags = [];
        var split = element.split('contain');
        var color = split[0].trim();
        color = color.replace('bags', '').trim().replace(' ', '');
        split[1].replace('.', '').split(',').forEach(child => {
            var words = child.trim().split(' ');
            var numberOfChildBags = parseInt(words[0]);
            var color = words[1] + words[2];
            childBags.push({ color, numberOfChildBags });
            if (child.includes('no other bags')) {
                childBags = [];
            }
        });
        input.push({
            color, childBags, parentBags: []
        });
    });
// console.log(JSON.stringify(input, null, 2));

// populate parent bags in input
input.forEach(currentColor => {
    currentColor.childBags.forEach(childBag => {
        var currentChildcolorInInput = input.filter(obj => {
            return obj.color === childBag.color
        });
        if (currentChildcolorInInput.length > 1) { throw new Error('Color is duplicate'); }
        if (currentChildcolorInInput.length === 0) { 
            currentChildcolorInInput.push({ 
                color: childBag.color,
                childBags: [],
                parentBags: []
            }); 
            console.log('I don\'t have a Parent yet!');
        }
        currentChildcolorInInput[0].parentBags.push({
            color: currentColor.color,
            numberOfBagsInParent: childBag.numberOfChildBags
        });
    });
});
// console.log(JSON.stringify(input, null, 2));

// get the shiny gold bag from the input
var colorToFind = input.filter(obj => {
    return obj.color === 'shinygold'
});
if (colorToFind.length !== 1) { throw new Error('Not exactly 1 color is found in the input'); }
// console.log('colorToFind: ' + JSON.stringify(colorToFind));

var parentBags = [];
colorToFind[0].parentBags.forEach(parentBag => {
    parentBags.push(parentBag);
});

var possibleBagColors = new Set();
var countMyBagsMan = 0;
var i = parentBags.length;
while (i--) {
    var currentBagInLoop = parentBags[i];
    possibleBagColors.add(currentBagInLoop.color);
    parentBags.splice(i, 1);
    var retrievedbags = input.filter(obj => {
        return obj.color === currentBagInLoop.color;
    });
    retrievedbags.forEach(retrievedBag => {
        retrievedBag.parentBags.forEach(parentBag => {
            parentBags.unshift(parentBag);
            i++;
        });
    });
}

var nLevelsDeep = 0;
var totalBagCount = 0;
var predecessingBagMultiplier = [];
function iterate(obj) {
    console.log('object to iterate: ' + JSON.stringify(obj))
    nLevelsDeep++;
    if (obj.numberOfChildBags) {
        predecessingBagMultiplier.push(obj.numberOfChildBags);
    }
    console.log('*** totalBagCount before: ' + totalBagCount);
    console.log('*** predecessingBagMultiplier after adding: ' + JSON.stringify(predecessingBagMultiplier));

    var retrievedObjects = input.filter(objjectToRetrieve => {
        return objjectToRetrieve.color === obj.color;
    });
    if (colorToFind.length !== 1) { throw new Error('Not exactly 1 color is found in the input'); }
    obj = retrievedObjects[0];

    if (obj.childBags === null || obj.childBags === undefined) { 
        throw new Error(
            'You have no childbags defined man'
        ); 
    }
    if (obj.childBags.length !== 0) {
        var totalBagsForPermutation = 1;
        predecessingBagMultiplier.forEach(bag => {
            totalBagsForPermutation = totalBagsForPermutation * bag
        });
        console.log('totalBagsForPermutation: ' + totalBagsForPermutation);

        totalBagCount = totalBagCount + totalBagsForPermutation;

        obj.childBags.forEach(childBag => {
            iterate(childBag);
        });
    }
    if (obj.childBags.length === 0) {
        var totalBagsForPermutation = 1;
        predecessingBagMultiplier.forEach(bag => {
            totalBagsForPermutation = totalBagsForPermutation * bag
        });
        console.log('totalBagsForPermutation: ' + totalBagsForPermutation);


        totalBagCount = totalBagCount + totalBagsForPermutation;

        predecessingBagMultiplier.pop();
        nLevelsDeep--;
    }
    console.log('*** totalBagCount after: ' + totalBagCount);
}

//colorToFind[0].numberOfChildBags = 1;
iterate(colorToFind[0]);

console.log('Puzzle One - : ' + possibleBagColors.size); // 151 or 4 for example
console.log('Puzzle Two - : totalBagCount: ' + totalBagCount); // 
console.log('Puzzle Two - : totalBagCount minus 1: ' + (totalBagCount - 1)); // not 54670944795636, 32 in example, 126 in example 2
