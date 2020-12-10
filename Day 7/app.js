const { count } = require('console');
var fs = require('fs');
const { setMaxListeners } = require('process');

var input = [];
fs.readFileSync('./inputExample.txt', 'utf-8')
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
// console.log('Puzzle One - : ' + possibleBagColors.size); // 151 or 4 for example

// var nLevelsDeep = 0;
// function countChildBags(obj, countOfChildBags) {
//     nLevelsDeep++;
//     console.log('^^^^^^^n levels deep: ' + nLevelsDeep);
//     console.log('countOfChildBags: ' + countOfChildBags);

//     var currentBagNumberOfChildbags = obj.numberOfChildBags;
//     obj = input.find(objectToRetrieve => {
//         return objectToRetrieve.color === obj.color;
//     });
//     console.log('object to iterate: ' + JSON.stringify(obj))

//     if (obj.childBags === null || obj.childBags === undefined) { 
//         throw new Error(
//             'You have no childbags defined man'
//         ); 
//     }

//     if (obj.childBags.length === 0) {
//         nLevelsDeep--;

//         return countOfChildBags + currentBagNumberOfChildbags;
//     }

//     if (obj.childBags.length !== 0) {
//         obj.childBags.forEach(childBag => {
//             var ret = currentBagNumberOfChildbags + currentBagNumberOfChildbags * countChildBags(childBag, countOfChildBags);
//             console.log('ret: ' + ret);
//             return ret;
//         });
//     }    
// }

var bagCount = 0;
function retrieveAndAddChildBagCount(bag) {
    var countInThisBag = 1;

    console.log('******************');
    console.log('bag to iterate: ' + JSON.stringify(bag));
    
    var foundBag = input.find(objectToRetrieve => {
        return objectToRetrieve.color = bag.color;
    });
    var bagsChilds = foundBag.childBags

    console.log('bagsChilds: ' + JSON.stringify(bagsChilds));

    if (bagsChilds.length === 0) { return bag.numberOfChildBags; }

    bagsChilds.forEach(childBag => {
        countInThisBag += bag.numberOfChildBags * retrieveAndAddChildBagCount(childBag)
        bagcount += countInThisBag;
    });

    return bagcount;
}

colorToFind[0].numberOfChildBags = 1;
console.log('puzzle two: ' + retrieveAndAddChildBagCount(colorToFind[0]));




// var bagCount = 0;
// function countChildBags(child, topLevelBagCount) {
//     var multiplier = topLevelBagCount;
//     console.log('********************');
//     console.log('multiplier: ' + multiplier)
//     child = input.find(objectToRetrieve => {
//         return objectToRetrieve.color === child.color;
//     });
//     console.log('object to iterate: ' + JSON.stringify(child))

//     if (child.childBags === null || child.childBags === undefined) { 
//         throw new Error(
//             'You have no childbags defined man'
//         ); 
//     }

//     if (child.childBags.length === 0) { return; }

//     console.log('childrenToAdd: ' + childrenToAdd);
//     child.childBags.forEach(childBag => {

//         const currentBagTotal = 0; // get current bag total som of child bags




//         const childrenToAdd = multiplier * currentBagTotal;
//         bagCount += childrenToAdd;

//         countChildBags(childBag, childBag.numberOfChildBags)
//     });
//     return bagCount;
// }

// // colorToFind[0].numberOfChildBags = 1;
// var totalCountBitch = countChildBags(colorToFind[0], 1);

// console.log('Puzzle Two - : bagCount: ' + bagCount); // 
// console.log('Puzzle Two - : bagCount minus 1: ' + (bagCount - 1)); // not 54670944795636, 32 in example, 126 in example 2
