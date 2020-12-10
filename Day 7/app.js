var fs = require('fs');

var input = [];
fs.readFileSync('./input.txt', 'utf-8')
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
// at this point, a recursive function may be prettier, but i'm keeping this bitch!
var colorToFind = input.filter(obj => {
    return obj.color === 'shinygold'
});
if (colorToFind.length !== 1) { throw new Error('Not exactly 1 color is found in the input'); }

var parentBags = [];
colorToFind[0].parentBags.forEach(parentBag => {
    parentBags.push(parentBag);
});

var possibleBagColors = new Set();
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
console.log('Puzzle One - : ' + possibleBagColors.size); // 151 or 4 for example

const countChildBagsRecursive = (bag) => {
    var count = 1;

    bag = input.find(objectToRetrieve => {
        return objectToRetrieve.color === bag.color;
    });

    // you don't need an explicit termination when there are no childs, since then there's nothing to 
    // iterate over, and no recursion will be induced
    bag.childBags.forEach(childBag => {
        count += childBag.numberOfChildBags * countChildBagsRecursive(childBag);
    });

    return count;
}

console.log('Puzzle two: ' + (countChildBagsRecursive(colorToFind[0]) - 1 )); // puzzle two: 32 for example 1, 126 for example 2, 41559 for input