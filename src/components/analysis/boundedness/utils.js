const getBoundedness = (placeIndex, markingObj) => {
    
    const allMarkings = []
    markingObj.forEach((m) => {
        m.forEach((n) => {
            if (n.marking !== 'OLD') {
                allMarkings.push(n.marking)                
            }
        })
    })
    return Math.max(...allMarkings.map(e => e[placeIndex]))
}

export { getBoundedness }