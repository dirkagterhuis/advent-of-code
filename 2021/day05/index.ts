import fs from 'fs'

interface mapping {
    x1: number
    y1: number
    x2: number
    y2: number
}

const data: mapping[] = []
fs.readFileSync('./inputExample.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((line) => {
        const coords: number[] = []
        line.trim()
            .replace(/\s+/g, '')
            .split('->')
            .map((str) => {
                str.split(',').map((num) => {
                    coords.push(parseInt(num, 10))
                })
            })
        data.push({
            x1: coords[0],
            y1: coords[1],
            x2: coords[2],
            y2: coords[3],
        })
    })

// console.table(data)

function getOverlapLargerThanTwo(includeDiagonals: boolean): number {
    const hydroThermalVentLineMap: number[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        const coords: mapping = data[i]
        let xMin: number = Math.min(coords.x1, coords.x2)
        let xMax: number = Math.max(coords.x1, coords.x2)
        let yMin: number = Math.min(coords.y1, coords.y2)
        let yMax: number = Math.max(coords.y1, coords.y2)

        // if diagonals are not included, don't draw the line in the map if it's not a straight line
        if (!includeDiagonals) {
            if (xMin !== xMax && yMin !== yMax) {
                continue
            }
        }

        // if diagonals are included, for the diagonal lines, with a particular direction, swap around the min/max coords
        if (xMin !== xMax && yMin !== yMax) {
            if (
                (coords.x1 < coords.x2 && coords.y1 > coords.y2) ||
                (coords.x1 > coords.x2 && coords.y1 < coords.y2)
            ) {
                const tempXMin = xMin
                const tempYmin = yMin
                xMin = xMax
                yMin = yMax
                xMax = xMin
                yMax = yMin
            }
        }

        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++) {
                if (!hydroThermalVentLineMap[y]) {
                    hydroThermalVentLineMap[y] = []
                    hydroThermalVentLineMap[y][x] = 1
                    continue
                }
                if (!hydroThermalVentLineMap[y][x]) {
                    hydroThermalVentLineMap[y][x] = 1
                    continue
                }
                hydroThermalVentLineMap[y][x]++
            }
        }
    }

    console.table(hydroThermalVentLineMap)

    let largerThanTwoCount = 0
    for (let x = 0; x < hydroThermalVentLineMap.length; x++) {
        if (hydroThermalVentLineMap[x] === undefined) {
            continue
        }
        for (let y = 0; y < hydroThermalVentLineMap[x].length; y++) {
            if (hydroThermalVentLineMap[x][y] === undefined) {
                continue
            }
            if (hydroThermalVentLineMap[x][y] >= 2) largerThanTwoCount++
        }
    }

    return largerThanTwoCount
}

console.log(
    `Part 1: there are ${getOverlapLargerThanTwo(false)} points where at least two lines overlap.`
)
console.log(
    `Part 2: there are ${getOverlapLargerThanTwo(true)} points where at least two lines overlap.`
)
