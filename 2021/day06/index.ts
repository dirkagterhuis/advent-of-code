import fs from 'fs'

const data: number[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map((num) => parseInt(num, 10))

interface fishGroup {
    atDay: number
    size: number
}

function part1(data: number[], days: number): number {
    // create start fish
    let fish: fishGroup[] = []
    for (let x = 0; x <= 8; x++) {
        fish.push({
            atDay: x,
            size: 0,
        })
    }

    // populate start population
    for (let x = 0; x < data.length; x++) {
        const currentFish: fishGroup = fish.find((element) => {
            return element.atDay === data[x]
        })
        currentFish.size++
    }

    // simulate
    for (let day = 1; day <= days; day++) {
        const newFish: fishGroup[] = []

        for (let i = 1; i < fish.length; i++) {
            newFish.push({
                atDay: fish[i].atDay - 1,
                size: fish[i].size,
            })
        }
        newFish.push({
            atDay: 8,
            size: fish[0].size,
        })
        newFish[6].size = newFish[6].size + fish[0].size
        fish = [...newFish]
    }
    let totalNumberOfFish = 0
    for (let i = 0; i < fish.length; i++) {
        totalNumberOfFish += fish[i].size
    }
    return totalNumberOfFish
}

const daysToCheck1 = 80
const daysToCheck2 = 256

console.log(`Part 1: After ${daysToCheck1} days, there are ${part1(data, daysToCheck1)} fish`)
console.log(`Part 2: After ${daysToCheck2} days, there are ${part1(data, daysToCheck2)} fish`)
