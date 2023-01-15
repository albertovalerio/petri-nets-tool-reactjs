 const initConditions = (places, transitions, arcs) => {
    let pre = {}
    let post = {}
    const m0 = {source:'',transition:'',target:'m0',mRef:'m0',marking:places.map((p) => parseInt(p.data.tokens))}    
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
    return { m0, pre, post }
}

const transitionsReadyToFire = (marking, preIncidence) => {
    let transitionsReady = []
    if (marking !== 'OLD') {
        Object.keys(preIncidence).forEach((t) => {
            const sub = marking.map((e,i) => e - preIncidence[t][i])
            if (sub.filter((e) => e < 0).length === 0) {
                transitionsReady.push(t)
            }
        })            
    }
    return transitionsReady
}

const checkNewNodeToAdd = (markingObj, preIncidence) => {
    let transitionsReady = []
    markingObj.forEach((m) => {
        if (m.marking !== 'OLD') {
            transitionsReady.push(transitionsReadyToFire(m.marking, preIncidence))            
        }
    })
    return transitionsReady.length > 0
}

const nextMarking = (marking, preIncidence, postIncidence, transition) => {
    let next = []
    marking.forEach((e,i) => {
        next.push(e - preIncidence[transition][i] + postIncidence[transition][i])
    })
    return next
}

const isAlreadyOnMarking = (markings, needle) => {
    let yes = []
    markings.forEach((m) => {
        if(JSON.stringify(m.mSequence) === JSON.stringify(needle)){
            yes.push(m.mLabel)
        }
    })
    return yes
}

const mergeSameNodes = (nodes, edges) => {
    let newNodes = nodes
    let newEdges = edges
    nodes.forEach((n,i) => {
        nodes.forEach((m,j) => {
            if (n.data.mRef === m.data.mRef && i !== j) {
                newNodes.splice(j,1)
                edges.forEach((e,k) => {
                    if (e.target === m.id) {
                        newEdges[k].target = n.id
                    }
                })
            }
        })
    })
    return [newNodes, newEdges]
}

const removeUnreachableNodes = (places, transitions, arcs) => {
    let newPlaces = places
    let newTransitions = transitions
    const sources = arcs.map((a) => a.source)
    const targets = arcs.map((a) => a.target)
    places.forEach((n,i) => {
        if (!sources.includes(n.id) && !targets.includes(n.id)) {
            newPlaces.splice(i,1)
        }
    })
    transitions.forEach((t,i) => {
        if (!sources.includes(t.id) && !targets.includes(t.id)) {
            newTransitions.splice(i,1)
        }
    })
    return [newPlaces, newTransitions]
}

export { initConditions, transitionsReadyToFire, checkNewNodeToAdd, nextMarking, isAlreadyOnMarking, mergeSameNodes, removeUnreachableNodes }