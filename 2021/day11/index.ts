import fs from 'fs'

const data: number[][] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((line) => {
        console.log(line)
        const lineArray: number[] = []
        line.split('').map((lineElement) => {
            lineArray.push(parseInt(lineElement, 10))
        })
        data.push(lineArray)
    })

console.table(data)
const lastRowIndex = data.length - 1
const lastColumnIndex = data[0].length - 1

const numberOfRuns = 300
let flashCount = 0
let flashCountAt100

// make this a while loop
for (let i = 1; i <= numberOfRuns; i++) {
    incrementAll()
    checkFlash()
    console.table(data)

    if (i === 100) {
        flashCountAt100 = flashCount
    }

    if (getSum() === 0) {
        console.log(`At 100 runs, flashcount is: ${flashCountAt100}`)
        console.log(`Number of runs after first simulaneous flash: ${i} `)
        break
    }
}

function incrementAll() {
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            data[y][x]++
        }
    }
}

function getSum(): number {
    let sum = 0
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            sum += data[y][x]
        }
    }
    return sum
}

function increment(elements: number[][]) {
    for (let i = 0; i < elements.length; i++) {
        let elementValue = data[elements[i][1]][elements[i][0]]
        if (elementValue !== 0) {
            data[elements[i][1]][elements[i][0]]++
        }
    }
}

function checkFlash() {
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === 0 || data[y][x] < 10) {
                continue
            }
            flash(x, y)
            checkFlash()
        }
    }
}

function flash(x: number, y: number) {
    flashCount++
    increment(getNeighbours(x, y))
    data[y][x] = 0
}

function getNeighbours(x: number, y: number): number[][] {
    const ret: number[][] = []
    for (let xDirection = -1; xDirection <= 1; xDirection++) {
        for (let yDirection = -1; yDirection <= 1; yDirection++) {
            if (xDirection === 0 && yDirection === 0) {
                continue
            }
            if (
                x + xDirection < 0 ||
                y + yDirection < 0 ||
                !coordExists(x + xDirection, y + yDirection)
            ) {
                continue
            }

            ret.push([x + xDirection, y + yDirection])
        }
    }
    return ret
}

function coordExists(x: number, y: number): boolean {
    if (x < 0 || x > lastColumnIndex || y < 0 || y > lastRowIndex) {
        return false
    }
    return true
}
