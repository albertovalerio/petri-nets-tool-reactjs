import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: [],
    transitions: [],
    arcs: []
}

const makeDataPersistent = (state) => {
    localStorage.setItem('places', JSON.stringify(state.places))
    localStorage.setItem('transitions', JSON.stringify(state.transitions))
    localStorage.setItem('arcs', JSON.stringify(state.arcs))
}

export const netSlice = createSlice({
    name: 'net',
    initialState,
    reducers: {
        addElementToNet: (state, action) => {
            switch (action.payload.type) {
                case 'place':
                    state.places = action.payload.el.length > 0 ? action.payload.el : [...state.places,action.payload.el]
                break
                case 'transition':
                    state.transitions =  action.payload.el.length > 0 ? action.payload.el : [...state.transitions,action.payload.el]
                break
                default:
                    state.arcs = action.payload.el.length > 0 ? action.payload.el : [...state.arcs,action.payload.el]
                break
            }
            makeDataPersistent(state)
        },
        updateElementFromNet: (state, action) => {
            switch (action.payload.type) {
                case 'place':
                    state.places.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.places.splice(i,1,action.payload.el)
                        }
                    })
                break
                case 'transition':
                    state.transitions.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.transitions.splice(i,1,action.payload.el)
                        }
                    })
                break
                default:
                    state.arcs.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.arcs.splice(i,1,action.payload.el)
                        }
                    })
                break
            }
            makeDataPersistent(state)
        },
        deleteElementFromNet: (state, action) => {
            switch (action.payload.type) {
                case 'place':
                    state.places.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.places.splice(i,1)
                        }
                    })
                break
                case 'transition':
                    state.transitions.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.transitions.splice(i,1)
                        }
                    })
                break
                default:
                    state.arcs.forEach((p,i) => {
                        if (p.id === action.payload.el.id) {
                            state.arcs.splice(i,1)
                        }
                    })
                break
            }
            makeDataPersistent(state)
        },
        resetNet: (state) => {
            state.places = []
            state.transitions = []
            state.arcs = []
            localStorage.clear()
        },
        saveNet: (state, action) => {
            const places = action.payload.nodes.filter(e => e.type === 'place')
            const transitions = action.payload.nodes.filter(e => e.type === 'transition')
            state.places = places
            state.transitions = transitions
            state.arcs = action.payload.edges
            makeDataPersistent(state)
        }
    }
})

// selectors
export const getPlaces = state => state.net.places
export const getTransitions = state => state.net.transitions
export const getArcs = state => state.net.arcs

export const { addElementToNet, resetNet, updateElementFromNet, deleteElementFromNet, saveNet } = netSlice.actions;
export default netSlice.reducer