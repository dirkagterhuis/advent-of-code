import fs from 'fs'

interface BingoBoardElement {
    number: number
    isDrawn: boolean
}

interface BingoBoard {
    numbers: BingoBoardElement[][]
    rowDrawnCount: number[]
    columnDrawnCount: number[]
    hasBingo: boolean
}

const data = fs.readFileSync('./input.txt', 'utf-8').split(/[\r\n]+/g)
const drawnNumbers: number[] = data[0].split(',').map((num) => parseInt(num, 10))

const bingoBoards: BingoBoard[] = []
let bingoBoard: BingoBoardElement[][] = []
for (let i = 1; i < data.length; i++) {
    const rowNumbers: number[] = data[i]
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((num) => parseInt(num, 10))
    const rowObjects: BingoBoardElement[] = []
    for (let j = 0; j < rowNumbers.length; j++) {
        rowObjects.push({
            number: rowNumbers[j],
            isDrawn: false,
            // hasBingo: false,
        })
    }
    bingoBoard.push(rowObjects)

    if (bingoBoard.length === 5) {
        bingoBoards.push({
            numbers: bingoBoard,
            rowDrawnCount: [0, 0, 0, 0, 0],
            columnDrawnCount: [0, 0, 0, 0, 0],
            hasBingo: false,
        })
        bingoBoard = []
    }
}

const numberOfBingoBoards = bingoBoards.length
let bingoCounter: number = 0
let currentDrawnNumber: number
drawnNumbers: for (let i = 0; i < drawnNumbers.length; i++) {
    currentDrawnNumber = drawnNumbers[i]
    for (let j = 0; j < bingoBoards.length; j++) {
        if (bingoBoards[j].hasBingo === true) {
            continue
        }
        draw(currentDrawnNumber, bingoBoards[j])

        if (bingoCounter === numberOfBingoBoards) {
            const sum = getSumOfUnmarkedNumbers(bingoBoards[j])
            console.log(
                `LAST BINGO! Drawn Number is: ${currentDrawnNumber}, sum is: ${sum}, product is: ${
                    currentDrawnNumber * sum
                }`
            )
            break drawnNumbers
        }
    }
}

function draw(drawnNumber: number, bingoBoard: BingoBoard) {
    for (let row = 0; row < bingoBoard.numbers.length; row++) {
        for (let column = 0; column < bingoBoard.numbers[row].length; column++) {
            if (bingoBoard.numbers[row][column].number === drawnNumber) {
                bingoBoard.numbers[row][column].isDrawn = true
                bingoBoard.rowDrawnCount[row]++
                bingoBoard.columnDrawnCount[column]++
            }
        }
    }
    checkForBingo(bingoBoard)
}

function checkForBingo(bingoBoard: BingoBoard) {
    if (bingoBoard.rowDrawnCount.includes(5) || bingoBoard.columnDrawnCount.includes(5)) {
        bingoBoard.hasBingo = true
        if (bingoCounter === 0) {
            const sum = getSumOfUnmarkedNumbers(bingoBoard)
            console.log(
                `FIRST BINGO! Drawn Number is: ${currentDrawnNumber}, sum is: ${sum}, product is: ${
                    currentDrawnNumber * sum
                }`
            )
        }
        bingoCounter++
        // console.log('BINGO!!')
    }
}

function getSumOfUnmarkedNumbers(bingoBoard: BingoBoard): number {
    let sum = 0
    for (let row = 0; row < bingoBoard.numbers.length; row++) {
        for (let column = 0; column < bingoBoard.numbers[row].length; column++) {
            if (!bingoBoard.numbers[row][column].isDrawn) {
                sum += bingoBoard.numbers[row][column].number
            }
        }
    }
    return sum
}
