import fs from 'fs'

interface Map {
    one: string
    two: string
    three: string
    four: string
    five: string
    six: string
    seven: string
    eight: string
    nine: string
    zero: string
}

const data: string[][] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((line) => {
        const lineEntries: string[] = line.replace('| ', '').split(' ')
        if (lineEntries.length !== 14) {
            throw new Error(`Expected 14 entries, actual: ${lineEntries.length}`)
        }
        data.push(lineEntries)
    })

console.table(data)

function part1() {
    let count1478: number = 0
    const numberOfDigitsFor1478: number[] = [2, 4, 3, 7]
    for (let i = 0; i < data.length; i++) {
        for (let j = 10; j <= 13; j++) {
            if (numberOfDigitsFor1478.includes(data[i][j].length)) {
                count1478++
            }
        }
    }
    return count1478
}

function part2() {
    let sum: number = 0
    for (let i = 0; i < data.length; i++) {
        const map: Map = getSevenSegmentMap(data[i].slice(0, 10))
        if (i === 0) console.log(map)

        let numberToAdd: string = ''
        for (let j = 10; j <= 13; j++) {
            const code: string = data[i][j]
            for (let k = 0; k < Object.entries(map).length; k++) {
                const digitCode: string = Object.values(map)[k]
                if (
                    new Set(code).size === new Set(code + digitCode).size &&
                    code.length === digitCode.length
                ) {
                    numberToAdd += wordToInteger[Object.entries(map)[k][0]]
                    break
                }
            }
        }
        sum += parseInt(numberToAdd, 10)
    }
    return sum
}

function getSevenSegmentMap(input: string[]): Map {
    const map: Map = {
        zero: undefined,
        one: undefined,
        two: undefined,
        three: undefined,
        four: undefined,
        five: undefined,
        six: undefined,
        seven: undefined,
        eight: undefined,
        nine: undefined,
    }

    // with partial courtesy to https://github.com/duketide/Advent-of-Code-2021/blob/main/aocode.2021.8.2commentedforgh.js
    input.sort((a, b) => a.length - b.length)
    map.one = input[0]
    map.seven = input[1]
    map.four = input[2]
    map.eight = input[9]

    for (let x = 3; x < 9; x++) {
        const currentCode = input[x]
        if (currentCode.length === 6) {
            if (Array.from(map.four).every((element) => currentCode.includes(element))) {
                map.nine = currentCode
                continue
            } else if (Array.from(map.seven).every((element) => currentCode.includes(element))) {
                map.zero = currentCode
                continue
            } else {
                map.six = currentCode
                continue
            }
        }
        if (Array.from(map.seven).every((element) => currentCode.includes(element))) {
            map.three = currentCode
            continue
        } else if (new Set(currentCode + map.four).size === 7) {
            map.two = currentCode
            continue
        } else {
            map.five = currentCode
            continue
        }
    }
    return map
}

// i know, it's late
const wordToInteger = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
}

console.log(`Part 1: There are ${part1()} 1's, 4's, 7's and  8's`)
console.log(`Part 2: The sum of all output values is: ${part2()} `)
