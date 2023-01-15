const routes = {
    dashboard: {
        label: 'Dashboard',
        uri: '/dashboard',
        slug: 'dashboard',
        children: []
    },
    simulation: {
        label: 'Simulation',
        uri: '#',
        slug: '#',
        children: [
        {
            label: 'Petri Net Editor',
            uri: '/dashboard/editor',
            slug: 'editor',
        },
        {
            label: 'Token Game',
            uri: '/dashboard/token-game',
            slug: 'token-game'
        }
    ]},
    analysis: {
        label: 'Analysis',
        uri: '#',
        slug: '#',
        children: [
        {
            label: 'Reachability',
            uri: '/dashboard/reachability',
            slug: 'reachability',
        },
        {
            label: 'Boundedness',
            uri: '/dashboard/boundedness',
            slug: 'boundedness'
        },
        {
            label: 'Liveness (Beta)',
            uri: '/dashboard/liveness',
            slug: 'liveness'
        },
        {
            label: 'Reversibility',
            uri: '/dashboard/reversibility',
            slug: 'reversibility'
        },
        {
            label: 'Incidence Matrix',
            uri: '/dashboard/incidence-matrix',
            slug: 'incidence-matrix'
        },
        {
            label: 'T-Invariants',
            uri: '/dashboard/t-invariants',
            slug: 't-invariants'
        },
        {
            label: 'S-Invariants',
            uri: '/dashboard/s-invariants',
            slug: 's-invariants'
        },
        {
            label: 'Siphons & Traps',
            uri: '/dashboard/siphons-traps',
            slug: 'siphons-traps'
        }
    ]}
}

const getRouteLabel = uri => {
    let routeMap = []
    Object.values(routes).forEach(r => {
        r.children.length ? r.children.forEach(c => routeMap.push({label:c.label,uri:c.uri})) : routeMap.push({label:r.label,uri:r.uri})
    })
    const routeMatch = routeMap.find(r => r.uri === uri)        
    return routeMatch !== undefined ? routeMatch.label : 0
}

export { routes, getRouteLabel }