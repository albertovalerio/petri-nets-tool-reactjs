import { initConditions, transitionsReadyToFire, checkNewNodeToAdd, nextMarking, mergeSameNodes, removeUnreachableNodes, isAlreadyOnMarking } from './utils'

const generateReachabilityMarking = (places, transitions, arcs) => {
    const [newPlaces, newTransitions] = removeUnreachableNodes(places, transitions, arcs)
    const m = []
    const all = []
    let counter = 0
    let counterM = 1
    const tol = 310
    const { m0, pre, post } = initConditions(newPlaces, newTransitions, arcs)
    m.push([m0])
    all.push({mLabel:'m0',mSequence:m0.marking})
    while (checkNewNodeToAdd(m[counter],pre) && m.length < tol) {
        let newNode = []
        const possibleMarking = m[counter]
        possibleMarking.forEach((m) => {
            transitionsReadyToFire(m.marking,pre).forEach((t) => {
                const next = nextMarking(m.marking,pre,post,t)
                if (isAlreadyOnMarking(all,next).length === 0) {
                    all.push({mLabel:'m'+counterM,mSequence:next})
                    newNode.push({
                        source:m.target,
                        transition:t,
                        target:'m'+counterM,
                        mRef:'m'+counterM,
                        marking:next
                    })
                    counterM++                            
                } else if (isAlreadyOnMarking(all,next).length === 1) {
                    all.push({mLabel:isAlreadyOnMarking(all,next)[0],mSequence:next})
                    newNode.push({
                        source:m.target,
                        transition:t,
                        target:'m'+counterM,
                        mRef:isAlreadyOnMarking(all,next)[0],
                        marking:'OLD'
                    })
                    counterM++
                }
            })
        })
        counter++
        m[counter] = newNode
    }
    return m
}

const initNodesAndTransitions = (markingObj, target) => {
    const position = { x: 0, y: 0 }
    const edgeType = target === 'tree' ? 'smoothstep' : 'straight'
    let initialNodes = []
    let initialEdges = []
    const isRoot = markingObj.filter(o => o.filter(m => m.source !== '' && m.mRef === 'm0').length)
    markingObj.forEach((el,i) => {
        el.forEach((m) => {
            const newNode = {
                id: m.target,
                type: ((i === 0 && target === 'tree') || (i === 0 && target === 'graph' && !isRoot) ? 'root' : (target === 'tree' ? 'nodeV' : 'nodeV')),
                position,
                data: {
                    label: m.marking === 'OLD' ? m.marking : '('+m.marking.toString()+')',
                    mRef: m.mRef
                }
            }
            if (i > 0) {
                const newEdge = {
                    id: m.transition+'-'+m.target,
                    type: edgeType,
                    source: m.source,
                    target: m.target,
                    label: m.transition,
                    markerEnd: {type:'arrowclosed'}
                }
                initialEdges.push(newEdge)
            }
            initialNodes.push(newNode)
        })
    })
    if (target === 'graph') {
        return mergeSameNodes(initialNodes, initialEdges)
    }
    return [initialNodes, initialEdges]
}

export { generateReachabilityMarking, initNodesAndTransitions }