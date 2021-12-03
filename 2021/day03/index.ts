import fs from 'fs'

const sumsOfIndex: number[] = []
let numberOfMeasurements = 0
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((inputElement) => {
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

console.log('numberOfMeasurements: ' + numberOfMeasurements)
console.log('sumsOfIndex: ' + sumsOfIndex)

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

console.log('sumsOfIndexResult: ' + sumsOfIndexResult)
console.log('inverseSumOfIndexResult: ' + inverseSumOfIndexResult)

const gammaRateBinary = sumsOfIndexResult.join('')
const gammaRate = parseInt(gammaRateBinary, 2)
const epsilonRateBinary = inverseSumOfIndexResult.join('')
const epsilonRate = parseInt(epsilonRateBinary, 2)

console.log(
    `Part 1: Gamma Rate = ${gammaRate}, Epsilon Rate = ${epsilonRate}, Power consumption = ${
        gammaRate * epsilonRate
    }`
)
