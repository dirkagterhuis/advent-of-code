import fs from 'fs'
import { _ } from 'lodash'

const openToCloseMapping = {
    '[': ']',
    '(': ')',
    '<': '>',
    '{': '}',
}

const closeToOpenMapping = _.invert(openToCloseMapping)

const illegalCharacterScoreMapping = {
    ']': 57,
    ')': 3,
    '>': 25137,
    '}': 1197,
}

let data: string[] = fs.readFileSync('./input.txt', 'utf-8').split(/[\r\n]+/g)

console.log(data)
const syntaxErrors: string[] = []

function filterBadSyntax() {
    const filteredData: string[] = []
    loopOverAllSyntax: for (let i = 0; i < data.length; i++) {
        const stack: string[] = []
        const syntax = data[i]
        stack.push(syntax[0])
        for (let characterIndex = 1; characterIndex < syntax.length; characterIndex++) {
            const currentCharacter = syntax[characterIndex]

            // It's an opening character, carry on
            if (Object.keys(openToCloseMapping).includes(currentCharacter)) {
                stack.push(currentCharacter)
                continue
            }

            // unexpected closing character
            if (stack[stack.length - 1] !== closeToOpenMapping[currentCharacter]) {
                syntaxErrors.push(currentCharacter)
                continue loopOverAllSyntax
            }

            stack.pop()
        }
        filteredData.push(syntax)
    }
    data = filteredData
}

filterBadSyntax()
console.log(`Part 1: total syntax error score: ${calculateSyntaxErrorScore()}`)

function calculateSyntaxErrorScore() {
    let score = 0
    for (let i = 0; i < syntaxErrors.length; i++) {
        score += illegalCharacterScoreMapping[syntaxErrors[i]]
    }
    return score
}

const lineCompletions: string[] = []
function completeLines() {
    for (let i = 0; i < data.length; i++) {
        let lineCompletion = ''
        const syntax = data[i]
        const remainingStack: string[] = makeRemainingStack(syntax)

        for (let j = remainingStack.length; j > 0; j--) {
            lineCompletion += openToCloseMapping[remainingStack[j - 1]]
        }
        lineCompletions.push(lineCompletion)
    }
}

completeLines()
console.table(lineCompletions)
console.log(`Part 2: completion middle score: ${getCompletionMiddleScore()}`)

function makeRemainingStack(syntax: string): string[] {
    const stack: string[] = []
    stack.push(syntax[0])
    for (let characterIndex = 1; characterIndex < syntax.length; characterIndex++) {
        const currentCharacter = syntax[characterIndex]
        if (Object.keys(openToCloseMapping).includes(currentCharacter)) {
            stack.push(currentCharacter)
            continue
        }
        stack.pop()
    }
    return stack
}

function getCompletionMiddleScore(): number {
    const completionScoreMapping = {
        ']': 2,
        ')': 1,
        '>': 4,
        '}': 3,
    }

    let completionScores: number[] = []
    for (let i = 0; i < lineCompletions.length; i++) {
        let completionScore: number = 0
        for (let j = 0; j < lineCompletions[i].length; j++) {
            const currentCharScore = completionScoreMapping[lineCompletions[i][j]]
            completionScore = completionScore * 5 + currentCharScore
        }
        completionScores.push(completionScore)
    }
    completionScores = completionScores.sort((a, b) => {
        return b - a
    })
    return completionScores[Math.floor(completionScores.length / 2)]
}
