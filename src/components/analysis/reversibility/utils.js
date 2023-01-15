const isReversible = (markingObj,edges) => {
    const paths = getMarkingSequences(markingObj,edges)
    const result = {m0:[[]],counterexample:[[]]}
    result.m0 = markingObj.length ? [markingObj[0][0].marking] : []
    paths.forEach((p) => {
        if (p[0].filter(e => e.replace('-LOOP','') === 'm0').length > 1) {
            result.counterexample = getMarkingsFromLabel(markingObj,p[0])
        }
    })
    return result
}

const getMarkingSequences = (markingObj,edges) => {
    const graph = {}
    markingObj.forEach((m) => {
        m.forEach((r) => {
            const isDeadEnd = !edges.find(e => e.source === r.mRef)
            let newEl = ''
            if (r.marking === 'OLD' && isDeadEnd) {
                newEl = r.mRef
            } else if (r.marking === 'OLD' && !isDeadEnd) {
                newEl = graph[r.mRef] ? r.mRef+'-LOOP' : r.mRef
            } else {
                newEl = r.target
            }
            if (r.source !== '' && Object.keys(graph).includes(r.source)) {
                graph[r.source].push(newEl)
            } else if (r.source !== '' && !Object.keys(graph).includes(r.source)) {
                graph[r.source] = [newEl]
            }
        })
    })
    return climbTree(graph,'m0',[])
}

const climbTree = (tree,currentNode,visited) => {
    let visitedPaths = []
    let path = []
    const scanPaths = (tree,currentNode,visited) => {
        visited.push(currentNode)
        path.push(visited)
        if (tree[currentNode]) {
            tree[currentNode].forEach((node) => {
                if (!visited.includes(node)) {
                    scanPaths(tree,node,[...visited])                    
                }
            })
        }
        visitedPaths.push(path)
        path = []
    }
    scanPaths(tree,currentNode,visited)
    return visitedPaths.filter(e => e.length).map(i => i.slice(-1))
}

const printMultiArray = (arr) => {
    let string = ''
    if (arr) {
        arr.forEach((row,i) => {
            string += '( '+row.join(', ')+(arr.length-1 === i ? ' ) ' : ' ) ➝ ')
        })            
    }
    return string
}

const getMarkingsFromLabel = (markingObj,sequence) => {
    const markingSequence = []
    const sequenceClear = sequence.map(e => e.replace('-LOOP',''))
    const dictionary = {}
    markingObj.forEach((m) => {
        m.forEach((r) => {
            dictionary[r.target] = r.marking
        })
    })
    sequenceClear.forEach(m => markingSequence.push(dictionary[m]))
    return markingSequence
}

export { isReversible, printMultiArray }
