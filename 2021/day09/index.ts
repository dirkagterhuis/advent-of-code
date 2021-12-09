import fs from 'fs'

interface Coords {
    x: number
    y: number
}

const data: number[][] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((line) => {
        const lineArray: number[] = []
        line.split('').map((lineElement) => {
            lineArray.push(parseInt(lineElement, 10))
        })
        data.push(lineArray)
    })

const lastRowIndex = data.length - 1
const lastColumnIndex = data[0].length - 1

let sumOfLowestPointsRiskLevel = 0
let basins: number[] = []
for (let row = 0; row < data.length; row++) {
    for (let column = 0; column < data[row].length; column++) {
        if (checkIfLowestPoint(data, row, column)) {
            sumOfLowestPointsRiskLevel += data[row][column] + 1

            basins.push(getBasinSize(column, row))
        }
    }
}

basins = basins.sort((a, b) => {
    return b - a
})
const largestThreeBasinsProduct = basins[0] * basins[1] * basins[2]

console.log(`Part 1: risk level is: ${sumOfLowestPointsRiskLevel}`)
console.log(`Part 2: 3 largest basins product: ${largestThreeBasinsProduct}`)

function checkIfLowestPoint(data: number[][], row: number, column: number): boolean {
    const value = data[row][column]

    // corners
    if (row === 0 && column === 0) {
        return isLowest(value, [data[row][column + 1], data[row + 1][column]])
    }
    if (row === 0 && column === lastColumnIndex) {
        return isLowest(value, [data[row][column - 1], data[row + 1][column]])
    }
    if (row === lastRowIndex && column === 0) {
        return isLowest(value, [data[row][column + 1], data[row - 1][column]])
    }
    if (row === lastRowIndex && column === lastColumnIndex) {
        return isLowest(value, [data[row][column - 1], data[row - 1][column]])
    }

    // edges minus corners
    if (row === 0) {
        return isLowest(value, [
            data[row + 1][column],
            data[row][column - 1],
            data[row][column + 1],
        ])
    }
    if (row === lastRowIndex) {
        return isLowest(value, [
            data[row - 1][column],
            data[row][column - 1],
            data[row][column + 1],
        ])
    }
    if (column === 0) {
        return isLowest(value, [
            data[row][column + 1],
            data[row - 1][column],
            data[row + 1][column],
        ])
    }
    if (column === lastColumnIndex) {
        return isLowest(value, [
            data[row][column - 1],
            data[row - 1][column],
            data[row + 1][column],
        ])
    }

    // inner
    return isLowest(value, [
        data[row + 1][column],
        data[row - 1][column],
        data[row][column + 1],
        data[row][column - 1],
    ])
}

function isLowest(point: number, of: number[]): boolean {
    if (point < Math.min(...of)) {
        return true
    }
    return false
}

let coveredCoords: Coords[] = []
let count: number
function getBasinSize(x: number, y: number): number {
    count = 0
    coveredCoords = []
    move(x, y)
    return count
}

function move(x: number, y: number) {
    if (coordExists(x, y) && !isCovered(x, y) && data[y][x] < 9) {
        count++
        coveredCoords.push({ x, y })
        move(x + 1, y)
        move(x - 1, y)
        move(x, y + 1)
        move(x, y - 1)
    }
}

function coordExists(x: number, y: number): boolean {
    if (x < 0 || x > lastColumnIndex || y < 0 || y > lastRowIndex) {
        return false
    }
    return true
}

function isCovered(x: number, y: number) {
    for (let z = 0; z < coveredCoords.length; z++) {
        if (coveredCoords[z].x === x && coveredCoords[z].y === y) {
            return true
        }
    }
    return false
}
