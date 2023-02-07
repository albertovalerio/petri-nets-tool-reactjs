const getFiringSequences = (markingObj,edges) => {
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
    const markingPaths = climbTree(graph,'m0',[])
    return matchMarkingToTransitions(markingPaths,edges)
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

const matchMarkingToTransitions = (paths, edges) => {
    const tPaths = []
    paths.forEach((p) => {
        const row = []
        p[0].forEach((m,i) => {
            if (i > 0) {
                const edge = edges.find((e) => e.source === p[0][i-1].replace('-LOOP','') && e.target === m.replace('-LOOP',''))
                const index = p[0].indexOf(m.replace('-LOOP',''))
                if (m.includes('-LOOP') && index !== -1) {
                    const loopEdge = edges.find((e) => e.source === p[0][index].replace('-LOOP','') && e.target === p[0][index + 1].replace('-LOOP',''))
                    row.push(edge.label)
                    row.push(loopEdge.label+'_LOOP')
                } else {
                    row.push(edge.label)
                }
            }
        })
        tPaths.push(row)
    })
    return tPaths
}

const isL0live = (firings, transition) => {
    let flag = 0
    firings.forEach((f) => {
        if (!f.includes(transition)) {
            flag++
        }
    })
    return flag === firings.length
}

const isL1live = (firings, transition) => {
    let flag = false
    firings.forEach((f) => {
        if (f.includes(transition)) {
            flag = true
        }
    })
    return flag
}

const isL2live = (firings, transition) => {
    let flag = 0
    firings.forEach((f) => {
        if (f.filter(i => i === transition).length > 1) {
            flag++
        }
    })
    return flag
}

const isL3live = (firings, transition) => {
    let flag = false    
    firings.forEach((f) => {
        const loop = f.find(t => t.includes('_LOOP'))
        if (loop) {
            const start = f.indexOf(loop.replace('_LOOP',''))
            const end = f.indexOf(loop)
            if (f.slice(start,end).includes(transition)) {
                flag = true
            }
        }
    })
    return flag
}

const isL4live = (firings, transition) => {
    let flag = 0
    firings.forEach((f) => {
        if (f.includes(transition)) {
            flag++
        }
    })
    return flag === firings.length
}

export { getFiringSequences, isL0live, isL1live, isL2live, isL3live, isL4live }
