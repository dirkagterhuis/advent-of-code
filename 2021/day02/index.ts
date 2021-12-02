import fs from 'fs'

interface vector {
    direction: string
    distance: number
}

interface coordinates {
    horizontal: number
    depth: number
    aim?: number
}

const data: vector[] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .forEach((command) => {
        let split = command.split(' ')
        data.push({
            direction: split[0],
            distance: Number(split[1]),
        })
    })

const locationPart1 = part1()
console.log(
    `Part 1: location is ${JSON.stringify(locationPart1)}, product of coords is: ${
        locationPart1.horizontal * locationPart1.depth
    }`
)

const locationPart2 = part2()
console.log(
    `Part 2: location is ${JSON.stringify(locationPart1)}, product of coords is: ${
        locationPart2.horizontal * locationPart2.depth
    }`
)

function part1(): coordinates {
    const location: coordinates = { horizontal: 0, depth: 0 }
    for (let i = 0; i < data.length; i++) {
        move1(location, data[i])
    }
    return location
}

function move1(location: coordinates, command: vector) {
    if (command.direction === 'forward') {
        return (location.horizontal += command.distance)
    }
    if (command.direction === 'down') {
        return (location.depth += command.distance)
    }
    if (command.direction === 'up') {
        return (location.depth -= command.distance)
    }
    throw new Error(`Direction ${command.direction} not supported`)
}

function part2(): coordinates {
    const location: coordinates = { horizontal: 0, depth: 0, aim: 0 }
    for (let i = 0; i < data.length; i++) {
        move2(location, data[i])
    }
    return location
}

function move2(location: coordinates, command: vector) {
    if (command.direction === 'forward') {
        location.horizontal += command.distance
        location.depth += command.distance * location.aim
        return location
    }
    if (command.direction === 'down') {
        return (location.aim += command.distance)
    }
    if (command.direction === 'up') {
        return (location.aim -= command.distance)
    }
    throw new Error(`Direction ${command.direction} not supported`)
}
