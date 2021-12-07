import fs from 'fs'

const data: number[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map((num) => parseInt(num, 10))

console.log(data)

const max: number = Math.max(...data)

function part1(): number {
    let minFuel: number
    for (let i = 0; i <= max; i++) {
        let distanceSum = 0
        for (let j = 0; j < data.length; j++) {
            distanceSum += Math.abs(i - data[j])
        }
        if (!minFuel) {
            minFuel = distanceSum
        }
        if (distanceSum < minFuel) minFuel = distanceSum
    }
    return minFuel
}

function part2(): number {
    let minFuel: number
    for (let i = 0; i <= max; i++) {
        let distanceSum = 0
        for (let j = 0; j < data.length; j++) {
            // I know, repeated code. The only difference lies here:
            const distance: number = Math.abs(i - data[j])
            for (let k = 0; k <= distance; k++) {
                distanceSum += k
            }
        }
        if (!minFuel) {
            minFuel = distanceSum
        }
        if (distanceSum < minFuel) minFuel = distanceSum
    }
    return minFuel
}

console.log(`Part 1: The minimal fuel consumption is: ${part1()}`)
console.log(`Part 2: The minimal fuel consumption is: ${part2()}`)
