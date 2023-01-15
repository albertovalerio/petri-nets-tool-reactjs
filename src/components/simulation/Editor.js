import React, { useCallback, useMemo, useRef, useState } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, MarkerType } from 'reactflow';
import './css/editor.css';
import { EditorControls } from './EditorControls';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTool, getCanvasOpt, getIsSelectable, getIsSidebarVisible, getModalOpt, getToastOpt, setActiveTool, setCanvasOpt, setElementToModify, setIsSelectable, setIsSidebarVisible, setModalOpt, setToastOpt } from '../../features/controlsSlice';
import { PlaceNode } from './PlaceNode';
import { TransitionNode } from './TransitionNode';
import { addElementToNet, deleteElementFromNet, getArcs, getPlaces, getTransitions, resetNet, saveNet, updateElementFromNet } from '../../features/netSlice';
import { Toast } from '../utils/Toast';
import { Sidebar } from '../utils/Sidebar';
import { Modal } from '../utils/Modal';

export const Editor = () => {

    const dispatch = useDispatch()
    const activeTool = useSelector(getActiveTool)
    const isSelectable = useSelector(getIsSelectable)
    const toastOpt = useSelector(getToastOpt)
    const modalOpt = useSelector(getModalOpt)
    const isSidebarVisible = useSelector(getIsSidebarVisible)
    const places = useSelector(getPlaces)
    const transitions = useSelector(getTransitions)
    const arcs = useSelector(getArcs)
    const canvasOpt = useSelector(getCanvasOpt)

    const initialNodes = () => {
        if (localStorage.getItem('places') || localStorage.getItem('transitions')) {
            return JSON.parse(localStorage.getItem('places')).concat(JSON.parse(localStorage.getItem('transitions')))
        } else if (places.length || transitions.length) {
            return places.concat(transitions)
        } else {
            return []
        }
    }
    const initialEdges = localStorage.getItem('arcs') ? JSON.parse(localStorage.getItem('arcs')) : (arcs.length ? arcs : [])

    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)
    const nodeTypes = useMemo(() => ({place: PlaceNode, transition: TransitionNode}),[])

    const onPaneClick = useCallback((e) => {
        e.preventDefault()
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left - 50,
            y: e.clientY - reactFlowBounds.top - 50,
        })
        const id = nodes.length === 0 ? '1' : String(Math.max(...nodes.map(n => parseInt(n.id))) + 1)
        const _places = reactFlowInstance.getNodes().filter(p => p.type === 'place')
        const _transitions = reactFlowInstance.getNodes().filter(p => p.type === 'transition')
        const placeLabel = _places.length === 0 ? '1' : String(_places.length + 1)
        const transitionLabel = _transitions.length === 0 ? '1' : String(_transitions.length + 1)
        if (activeTool === 'place') {
            const el = {
                id,
                type: 'place',
                position,
                data: { label: 'p'+placeLabel, tokens: '0' },
            }
            setNodes((nds) => nds.concat(el))
            dispatch(addElementToNet({type:el.type,el}))
        }
        if (activeTool === 'transition') {
            const el = {
                id,
                type: 'transition',
                position,
                data: { label: 't'+transitionLabel },
            }
            setNodes((nds) => nds.concat(el))
            dispatch(addElementToNet({type:el.type,el}))
        }
    }, [reactFlowInstance, nodes, activeTool, setNodes, dispatch])

    const onConnect = useCallback((params) => {
        const sourceType = reactFlowInstance.getNode(params.source).type
        const targetType = reactFlowInstance.getNode(params.target).type
        let alreadyExist = false
        reactFlowInstance.getEdges().forEach((t) => {
            if (t.source === params.source && t.target === params.target) {
                alreadyExist = true
            }
        })
        if (sourceType !== targetType && !alreadyExist) {
            const el = {
                id: edges.length === 0 ? '1' : String(Math.max(...edges.map(n => parseInt(n.id))) + 1),
                type: 'straight',
                source: String(params.source),
                target: String(params.target),
                label: '1',
                markerEnd: {type: MarkerType.ArrowClosed}
            }
            setEdges((eds) => eds.concat(el))
            dispatch(addElementToNet({type:el.type,el}))
        } else if (sourceType === targetType) {
            const toast = {
                isVisible: true,
                context: 'pending',
                title: 'Oh oh... Attention!',
                msg: 'You can\'t connect two nodes of the same type.'
            }
            dispatch(setToastOpt(toast))
            setTimeout(() => {
                dispatch(setToastOpt({isVisible:false}))
            }, 20000)
        }
    }, [reactFlowInstance, edges, setEdges, dispatch])

    const onNodeClick = useCallback((event, node) => {
        if (activeTool === 'pointer') {
            dispatch(setElementToModify(node))
            dispatch(setIsSidebarVisible(true))
        } else {
            const toast = {
                isVisible: true,
                context: 'dark',
                title: 'Hint!',
                msg: 'Select the POINTER tool if you want to change element\'s options.'
            }
            dispatch(setToastOpt(toast))
            setTimeout(() => {
                dispatch(setToastOpt({isVisible:false}))
            }, 10000)
        }
    },[activeTool, dispatch])

    const onEdgeClick = useCallback((event, edge) => {
        if (activeTool === 'pointer') {
            dispatch(setElementToModify(edge))
            dispatch(setIsSidebarVisible(true))
        } else {
            const toast = {
                isVisible: true,
                context: 'dark',
                title: 'Hint!',
                msg: 'Select the POINTER tool if you want to change element\'s options.'
            }
            dispatch(setToastOpt(toast))
            setTimeout(() => {
                dispatch(setToastOpt({isVisible:false}))
            }, 10000)
        }
    },[activeTool, dispatch])

    const onResetCanvas = useCallback(() => {
        reactFlowInstance.setNodes([])
        reactFlowInstance.setEdges([])
        dispatch(resetNet())
        dispatch(setModalOpt({isVisible:false}))
        dispatch(setActiveTool('place'))
    },[reactFlowInstance, dispatch])

    const onSaveCanvas = useCallback(() => {
        dispatch(setActiveTool('save'))
        dispatch(setIsSelectable(false))
        let toast = {}
        const currentNodes = reactFlowInstance.getNodes().map(n => n.data.label)
        const checkDuplicated = currentNodes.filter((n,i) => currentNodes.indexOf(n) !== i)
        if (checkDuplicated.length) {
            toast = {
                isVisible: true,
                context: 'pending',
                title: 'Oh oh... Attention!',
                msg: 'It\'s not possible to have two or more nodes with the same label ( '+checkDuplicated+' ).'
            }
        } else {
            dispatch(saveNet({nodes:reactFlowInstance.getNodes(),edges:reactFlowInstance.getEdges()}))
            toast = {
                isVisible: true,
                context: 'success',
                title: 'Success!',
                msg: 'Operation successfully completed. Now you can surf pages and keep your Petri Net safe!'
            }    
        }
        dispatch(setToastOpt(toast))
        setTimeout(() => {
            dispatch(setActiveTool('place'))
        }, 100)
        setTimeout(() => {
            dispatch(setToastOpt({isVisible:false}))
        }, 10000)

    },[reactFlowInstance, dispatch])

    const onUpdateEl = useCallback((el) => {
        if (el.type === 'place' || el.type === 'transition') {
            reactFlowInstance.setNodes((nds) => [...nds, el])            
        } else {
            reactFlowInstance.setEdges((eds) => {
                let index = 0
                eds.forEach((e,i) => {
                    if (e.id === el.id) {
                        index = i
                    }
                })
                eds.splice(index,1,el)
                return eds
            })
        }
        dispatch(updateElementFromNet({type:el.type,el}))
        dispatch(setIsSidebarVisible(false))
        dispatch(setElementToModify({}))
    },[reactFlowInstance, dispatch])

    const onDeleteEl = useCallback((el) => {
        if (el.type === 'place' || el.type === 'transition') {
            reactFlowInstance.deleteElements({nodes:[el],edges:[]})
            setTimeout(() => {
                dispatch(addElementToNet({type:'edges',el:reactFlowInstance.getEdges()}))
            },1000)
        } else {
            reactFlowInstance.deleteElements({nodes:[],edges:[el]})
        }
        dispatch(deleteElementFromNet({type:el.type,el}))
        dispatch(setIsSidebarVisible(false))
        dispatch(setElementToModify({}))
    },[reactFlowInstance, dispatch])

    const onChangeStyle = useCallback((target) => {
        if (reactFlowInstance.getEdges().length) {
            reactFlowInstance.setEdges((eds) => {
                eds.forEach((e) => {
                    e.type = canvasOpt[target].arcType
                })
                return eds
            })                
        } else {
            dispatch(setCanvasOpt({target,opt:{arcType:'straight'}}))
        }
        dispatch(setModalOpt({isVisible:false}))
    },[reactFlowInstance, dispatch, canvasOpt])

    return (
        <>
        <Toast opt={toastOpt} />
        <Modal opt={modalOpt} canvasOpt={canvasOpt} onResetCanvas={onResetCanvas} onChangeStyle={onChangeStyle} />
        <Sidebar isVisible={isSidebarVisible} onDelete={onDeleteEl} onUpdate={onUpdateEl} />
        <EditorControls onSaveCanvas={onSaveCanvas} />
        <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="col-span-12">
                <ReactFlowProvider>
                    <div className="box p-5 reactflow-wrapper" style={{ height:(window.innerHeight-20-( reactFlowWrapper.current ? reactFlowWrapper.current.getBoundingClientRect().top : 0))}} ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            defaultzoom={1.5}
                            minZoom={0.2}
                            maxZoom={4}
                            zoomOnScroll={false}
                            nodeTypes={nodeTypes}
                            elementsSelectable={isSelectable}
                            onInit={setReactFlowInstance}
                            onPaneClick={onPaneClick}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}
                            onEdgeClick={onEdgeClick}
                        >
                            <MiniMap zoomable pannable className='hidden md:block' />
                            <Controls />
                            <Background />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </div>
        </>
    )
}