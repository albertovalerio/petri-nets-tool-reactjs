const getInputSubset = (selection, transitions, arcs) => {
    const intup = arcs.filter(a => selection.includes(a.target)).map(e => e.source)
    return transitions.filter(t => intup.includes(t.id)).map(e => e.data.label)
}

const getOutputSubset = (selection, transitions, arcs) => {
    const output = arcs.filter(a => selection.includes(a.source)).map(e => e.target)
    return transitions.filter(t => output.includes(t.id)).map(e => e.data.label)
}

const isSiphon = (pre, post) => {
    return pre.every(t => post.includes(t))
}

const isTrap = (pre, post) => {
    return post.every(t => pre.includes(t))
}

export { getInputSubset, getOutputSubset, isSiphon, isTrap }