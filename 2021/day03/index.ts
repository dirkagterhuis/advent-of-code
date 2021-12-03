import fs from 'fs'

let numberOfMeasurements = 0
let data: number[][] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((element) => {
        data.push(
            element.split('').map((str) => {
                return parseInt(str, 10)
            })
        )
    })

// console.log(JSON.stringify(data))

function checkMostOccuringBinary(inputArray: number[][]): number[] {
    const sumsOfIndex: number[] = []
    inputArray.map((inputElement) => {
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i]
            if (typeof sumsOfIndex[i] === 'undefined') {
                sumsOfIndex.push(Number(inputElement[i]))
                continue
            }
            sumsOfIndex[i] += Number(inputElement[i])
        }
        numberOfMeasurements++
    })
    return sumsOfIndex
}

const sumsOfIndex = checkMostOccuringBinary(data)
const sumsOfIndexResult: number[] = []
const inverseSumOfIndexResult: number[] = []
for (let i = 0; i < sumsOfIndex.length; i++) {
    const result = sumsOfIndex[i] > numberOfMeasurements / 2 ? 1 : 0
    sumsOfIndexResult.push(result)
    if (result === 1) {
        inverseSumOfIndexResult.push(0)
    }
    if (result === 0) {
        inverseSumOfIndexResult.push(1)
    }
}

const gammaRateBinary = sumsOfIndexResult.join('')
const gammaRate = parseInt(gammaRateBinary, 2)
const epsilonRateBinary = inverseSumOfIndexResult.join('')
const epsilonRate = parseInt(epsilonRateBinary, 2)

console.log(
    `Part 1: Gamma Rate = ${gammaRate}, Epsilon Rate = ${epsilonRate}, Power consumption = ${
        gammaRate * epsilonRate
    }`
)

let dataForOxygen = [...data]
let dataForCO2 = [...data]
for (let i = 0; i < sumsOfIndex.length; i++) {
    let sumsOfIndexReducedOxygen = checkMostOccuringBinary(dataForOxygen)
    const currentBinaryToFilterOnForOxyen =
        sumsOfIndexReducedOxygen[i] >= dataForOxygen.length / 2 ? 1 : 0
    if (dataForOxygen.length !== 1) {
        dataForOxygen = filterOnBinaryOnK(dataForOxygen, currentBinaryToFilterOnForOxyen, i)
    }

    let sumsOfIndexReducedCO2 = checkMostOccuringBinary(dataForCO2)
    const currentBinaryToFilterOnForCO2 = sumsOfIndexReducedCO2[i] >= dataForCO2.length / 2 ? 0 : 1
    if (dataForCO2.length !== 1) {
        dataForCO2 = filterOnBinaryOnK(dataForCO2, currentBinaryToFilterOnForCO2, i)
    }
}

function filterOnBinaryOnK(arrayToFilter: number[][], binary: number, k: number): number[][] {
    const ret = []
    for (let l = 0; l < arrayToFilter.length; l++) {
        if (arrayToFilter[l][k] === binary) {
            ret.push(arrayToFilter[l])
        }
    }
    return ret
}

const oxygenGeneratorRatingBinary = dataForOxygen[0].join('')
const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2)
const co2RatingBinary = dataForCO2[0].join('')
const co2Rating = parseInt(co2RatingBinary, 2)

console.log(
    `Part 2: oxygenGeneratorRating = ${oxygenGeneratorRating}, cO2ScrubberRating = ${co2Rating}, Life Support Rating = ${
        oxygenGeneratorRating * co2Rating
    }`
)
