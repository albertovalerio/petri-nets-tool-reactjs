import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeTool: 'place',
    selectMsg: 'place',
    isSelectable: false,
    toastOpt: {
        isVisible: false,
        context: 'pending',
        title: '',
        msg: ''
    },
    modalOpt: {
        isVisible: false,
        context: 'danger',
        title: '',
        msg: '',
        confirmBtn: '',
        target: ''
    },
    convasOpt: {
        editor: {
            arcType: (localStorage.getItem('arcs') && JSON.parse(localStorage.getItem('arcs')).length ? JSON.parse(localStorage.getItem('arcs'))[0].type : 'straight')
        },
        tree: {
            arcType: 'straight',
            nodeType: 'nodeH'
        },
        graph: {
            arcType: 'straight',
            nodeType: 'nodeV'
        }    
    },
    isSidebarVisible: false,
    elementToModify: {},
    placeSelection: {},
    placeAnalysis: {
        status: 'stopped',
        selection: [],
        pre: [],
        post: []
    },
    mobileMenu: {
        mobileCss: 'hidden',
        openMenu: ''
    }
}

export const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        setActiveTool: (state, action) => {
            state.activeTool = action.payload
        },
        setSelectMsg: (state, action) => {
            state.selectMsg = action.payload
        },
        setIsSelectable: (state, action) => {
            state.isSelectable = action.payload
        },
        setToastOpt: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.toastOpt[k] = action.payload[k]
            })
        },
        setModalOpt: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.modalOpt[k] = action.payload[k]
            })
        },
        setIsSidebarVisible: (state, action) => {
            state.isSidebarVisible = action.payload
        },
        setElementToModify: (state, action) => {
            if (Object.keys(action.payload).includes('field')) {
                switch (action.payload.field) {
                    case 'label':
                        state.elementToModify.data = {...state.elementToModify.data, label: String(action.payload.value)}
                        break
                    case 'token':
                        state.elementToModify.data = {...state.elementToModify.data, tokens: String(action.payload.value)}
                        break
                    case 'cardinality':
                        state.elementToModify = {...state.elementToModify, label: String(action.payload.value)}
                        break
                    default:
                        break
                }
            } else {
                state.elementToModify = action.payload
            }
        },
        setCanvasOpt: (state, action) => {
            Object.keys(action.payload.opt).forEach((k) => {
                state.convasOpt[action.payload.target][k] = action.payload.opt[k]
            }) 
        },
        setPlaceSelection: (state, action) => {
            state.placeSelection[action.payload.id] = action.payload.value
        },
        setPlaceAnalysis: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.placeAnalysis[k] = action.payload[k]
            }) 
        },
        resetPlaceAnalysis: (state, action) => {
            state.placeAnalysis = {
                status: 'stopped',
                selection: [],
                pre: [],
                post: []
            }
        },
        setMobileMenu: (state, action) => {
            Object.keys(action.payload).forEach((k) => {
                state.mobileMenu[k] = action.payload[k]
            }) 
        },
    }
})

// selectors
export const getActiveTool = state => state.controls.activeTool
export const getSelectMsg = state => state.controls.selectMsg
export const getIsSelectable = state => state.controls.isSelectable
export const getToastOpt = state => state.controls.toastOpt
export const getModalOpt = state => state.controls.modalOpt
export const getIsSidebarVisible = state => state.controls.isSidebarVisible
export const getElementToModify = state => state.controls.elementToModify
export const getCanvasOpt = state => state.controls.convasOpt
export const getPlaceSelection = state => state.controls.placeSelection
export const getPlaceAnalysis = state => state.controls.placeAnalysis
export const getMobileMenu = state => state.controls.mobileMenu

export const { setActiveTool, setSelectMsg, setIsSelectable, setToastOpt, setModalOpt, setIsSidebarVisible, setElementToModify, setCanvasOpt, setPlaceSelection, setPlaceAnalysis, resetPlaceAnalysis, setMobileMenu } = controlsSlice.actions;
export default controlsSlice.reducer