import { removeUnreachableNodes } from "../reachability/utils"

const initMatrices = (places, transitions, arcs) => {
    const [newPlaces, newTransitions] = removeUnreachableNodes(places, transitions, arcs)
    let pre = {}
    let post = {}
    transitions.forEach((t) => {
        let iPlace = []
        let oPlace = []
        places.forEach((p) => {
            const isInput = arcs.filter((a) => p.id === a.source && t.id === a.target)
            isInput[0] !== undefined ? iPlace.push(isInput[0].label) : iPlace.push('0')
            const isOutput = arcs.filter((a) => t.id === a.source && p.id === a.target)
            isOutput[0] !== undefined ? oPlace.push(isOutput[0].label) : oPlace.push('0')
        })
        pre[t.data.label] = iPlace.map(n => parseInt(n))
        post[t.data.label] = oPlace.map(n => parseInt(n))
    })
    const labels = {
        columns: newPlaces.map(p => p.data.label),
        rows: newTransitions.map(t => t.data.label)
    }
    return { pre, post, labels }
}

const matrixDifference = (minuend, subtrahend) => {
    const difference = {}
    Object.keys(minuend).forEach((row) => {
        difference[row] = minuend[row].map((a,j) => a - subtrahend[row][j])
    })
    return difference
}

const matrixTranspose = (matrix) => {
    const transpose = {}
    const val = Object.values(matrix)
    const output = val.length ? val[0].map((_, i) => val.map(row => row[i])) : []
    output.forEach((row,i) => {
        transpose[i] = row
    })
    return transpose
}

export { initMatrices, matrixDifference, matrixTranspose }