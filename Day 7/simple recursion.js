function recursion(obj, countOfChildBags) {
    if (obj.children = []) {
        return countOfChildBags + obj.numberOfChildBags;
    }
    obj.children.forEach(child => {
        return obj.numberOfChildBags + obj.numberOfChildBags * recursion(child, obj.numberOfChildBags)
    })
}

function recursion2(parent, childin) {
    if (parent.children = []) {
        parent.countOfChildBags = parent.countOfChildBags + childin.numberOfChildBags
        return parent;
    }
    parent.children.forEach(child => {
        return parent.numberOfChildBags + parent.numberOfChildBags * recursion(child)
    })
}

function recursion(obj, count) {
    if (childHasNoChildren) {
        return count + currentBag.numberforchildren;
    } 
    if (child has children) {
        return currentBag.numberforchildren + currentBag.numberforchildren * recursion(obj, count);
    }
}

function countTotalChildren(bag, numberOfBags) {
    count = 1;
    if (NoChildren) {
        return numberOfBags;
    } 
    if (children) {
        
        
        return numberOfBags + countTotalChildren(bag, numberOfBags);
    }
}

function countTotalChildren(children) {
    count = 1;
    // get childrens children
    children.forEach(
        var multiplier = # of bags in parent;
        count += multiplier * countTotalChildren()
    );
    return count;


}