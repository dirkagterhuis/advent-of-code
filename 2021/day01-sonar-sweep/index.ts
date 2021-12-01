import fs from 'fs'

const data: number[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((num) => parseInt(num, 10))

function getIncreaseCount(inputArray: number[]): number {
    let increaseCount: number = 0
    for (let i = 1; i < inputArray.length; i++) {
        if (inputArray[i] > inputArray[i - 1]) {
            increaseCount++
        }
    }
    return increaseCount
}

function getSlidingSumOfThree(inputArray: number[]): number[] {
    const ret = []
    for (let i = 2; i < inputArray.length; i++) {
        ret.push(inputArray[i] + inputArray[i - 1] + inputArray[i - 2])
    }
    return ret
}

console.log(`Part 1: there are ${getIncreaseCount(data)} increases`)
console.log(`Part 2: there are ${getIncreaseCount(getSlidingSumOfThree(data))} increases`)
