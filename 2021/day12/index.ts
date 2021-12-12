// mom's spaghetti

import fs from 'fs'

type CaveType = 'small' | 'large' | 'start' | 'end'

interface Cave {
    name: string
    caveType: CaveType
    connectedCaves: Set<string>
}

interface Path {
    path: string[]
    small: string
}

const caves: Cave[] = []
fs.readFileSync('./input.txt', 'utf-8')
    .split(/[\r\n]+/g)
    .map((line) => {
        const sourceDestArr = line.split('-')
        let caveSourceName = sourceDestArr[0]
        let caveDestName = sourceDestArr[1]
        addCaveConnectionToCave(caveSourceName, caveDestName)
        addCaveConnectionToCave(caveDestName, caveSourceName)
    })

console.log(`Data: ${JSON.stringify(caves, null, 2)}`)

console.log(`Part 1 routes.length: ${run1()}`)
console.log(`Part 2 routes.length: ${run2()}`)

function run1(): number {
    const routes: string[][] = []

    // almost there but got stuck on reducing the route. Got a lil' help from https://topaz.github.io/paste/#XQAAAQAdBAAAAAAAAAA0m0pnuFI8czedv0pOr1quBAFOpOe7l155KDymRgr7q2PVgEx1IW1vUC3eqlfXJ3JetYAE0UpwLvBiLofU0GWNJ2/KRXoxxhezzWXgc/2u1Hy/ChGoeRkTFC0ApKpdybLtby/Ge1Nz/o25nq0KfYaZNfYPi5WGJ7SmCakmO7juZkOsjKjV2cOwYIBczT4LqEAbSNAom3eNjX77Nc2Gm23j3ll3rjfXCR9oh0oa3iqCrbofsrFOGH2wBxWwD3upOVaX4yQDZLaxCfyU1bgE+ZYoJM3O0hL6dggpjm8sB3VzIDWvt7qouv3kjXWKLq7lXhbqVPefwh9mh1qrMzRVfDhUTTDAuN70fMrlcTFoLmYLAmQXKfzMtpaMHGUtsJRkEs/d79WF81RvSFuwVjRuuDVO0gWYAjWWushQWImeq00461yA+ByFb60jRjzDq90RT2By9RZYiscu5kYd/W+uyLpBQgHmO0NjUvVXRCJuBjZP+SJNqt203Iayn4j2YdL3WFM28JNK2IDsxtB7Ub+7oWDQ0gM/bz2u8JG5WkMDb5gJZTYQISrfJj9gjuBtpstRyLpowMfNqJO//4QAF3/Mq9aC7V5Mu5O8RZofMDyDzjwGBgbHIYpGAjgAyc4DzyKj0WsKIpYYg1bq0fWmt3LOdUP/9L/InQ==
    const queue: string[][] = [['start']]

    while (queue.length > 0) {
        let path = queue.pop()
        const currentCave: Cave = caves.find((element) => element.name === path[path.length - 1])
        const currentCaveConnectedCaves = Array.from(currentCave.connectedCaves)
        for (let i = 0; i < currentCaveConnectedCaves.length; i++) {
            if (currentCaveConnectedCaves[i] === 'end') {
                routes.push(path)
                continue
            }
            // Submarine has already been there
            if (
                getType(currentCaveConnectedCaves[i]) === 'large' ||
                !path.includes(currentCaveConnectedCaves[i])
            ) {
                queue.push(path.concat(currentCaveConnectedCaves[i]))
            }
        }
    }
    return routes.length
}

function run2(): number {
    const queue: Path[] = [{ path: ['start'], small: null }]
    const routes: Path[] = []

    // it's late, thanks https://topaz.github.io/paste/#XQAAAQAdBAAAAAAAAAA0m0pnuFI8czedv0pOr1quBAFOpOe7l155KDymRgr7q2PVgEx1IW1vUC3eqlfXJ3JetYAE0UpwLvBiLofU0GWNJ2/KRXoxxhezzWXgc/2u1Hy/ChGoeRkTFC0ApKpdybLtby/Ge1Nz/o25nq0KfYaZNfYPi5WGJ7SmCakmO7juZkOsjKjV2cOwYIBczT4LqEAbSNAom3eNjX77Nc2Gm23j3ll3rjfXCR9oh0oa3iqCrbofsrFOGH2wBxWwD3upOVaX4yQDZLaxCfyU1bgE+ZYoJM3O0hL6dggpjm8sB3VzIDWvt7qouv3kjXWKLq7lXhbqVPefwh9mh1qrMzRVfDhUTTDAuN70fMrlcTFoLmYLAmQXKfzMtpaMHGUtsJRkEs/d79WF81RvSFuwVjRuuDVO0gWYAjWWushQWImeq00461yA+ByFb60jRjzDq90RT2By9RZYiscu5kYd/W+uyLpBQgHmO0NjUvVXRCJuBjZP+SJNqt203Iayn4j2YdL3WFM28JNK2IDsxtB7Ub+7oWDQ0gM/bz2u8JG5WkMDb5gJZTYQISrfJj9gjuBtpstRyLpowMfNqJO//4QAF3/Mq9aC7V5Mu5O8RZofMDyDzjwGBgbHIYpGAjgAyc4DzyKj0WsKIpYYg1bq0fWmt3LOdUP/9L/InQ==
    while (queue.length > 0) {
        let path = queue.pop()
        const currentCave: Cave = caves.find(
            (element) => element.name === path.path[path.path.length - 1]
        )
        const currentCaveConnectedCaves = Array.from(currentCave.connectedCaves)

        for (let i = 0; i < currentCaveConnectedCaves.length; i++) {
            if (currentCaveConnectedCaves[i] === 'end') {
                routes.push(path)
                continue
            }
            if (
                getType(currentCaveConnectedCaves[i]) === 'large' ||
                !path.path.includes(currentCaveConnectedCaves[i])
            ) {
                queue.push({
                    path: path.path.concat([currentCaveConnectedCaves[i]]),
                    small: path.small,
                })
                continue
            }
            if (currentCaveConnectedCaves[i] !== 'start' && !path.small) {
                queue.push({
                    path: path.path.concat([currentCaveConnectedCaves[i]]),
                    small: currentCaveConnectedCaves[i],
                })
            }
        }
    }
    return routes.length
}

function getType(caveName: string): CaveType {
    if (caveName === 'start') {
        return 'start'
    }
    if (caveName === 'end') {
        return 'end'
    }
    if (caveName === caveName.toUpperCase()) {
        return 'large'
    }
    if (caveName === caveName.toLowerCase()) {
        return 'small'
    }
    throw new Error(`Mixed caving in cavename: ${caveName}`)
}

function addCaveConnectionToCave(caveToFind: string, caveToAdd: string) {
    const foundCave = caves.find((element) => element.name === caveToFind)
    if (foundCave) {
        foundCave.connectedCaves.add(caveToAdd)
    } else {
        caves.push({
            name: caveToFind,
            caveType: getType(caveToFind),
            connectedCaves: new Set<string>([caveToAdd]),
        })
    }
}
