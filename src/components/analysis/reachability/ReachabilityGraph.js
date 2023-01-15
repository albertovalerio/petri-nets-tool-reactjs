import React, { useCallback, useMemo, useState } from 'react';
import 'reactflow/dist/style.css';
import '../../simulation/css/editor.css'
import ReactFlow, { Controls, Background, ReactFlowProvider, ConnectionLineType, Panel } from 'reactflow';
import dagre from 'dagre'
import { initNodesAndTransitions } from './kernel';
import { NodeRoot } from './NodeRoot'
import { NodeLeaf } from './NodeLeaf'
import { NodeH } from './NodeH';
import { NodeV } from './NodeV';
import { Divide } from 'react-feather';

export const ReachabilityGraph = ({ markings }) => {

    const [initialNodes, initialEdges] = initNodesAndTransitions(markings, 'graph')
    const [orientation, setOrientation] = useState('V')

    const getLayoutedElements = (nodes, edges) => {
        const dagreGraph = new dagre.graphlib.Graph()
        dagreGraph.setDefaultEdgeLabel(() => ({}))
        const nodeWidth = 150
        const nodeHeight = 100
        dagreGraph.setGraph({ rankdir: 'TB' })
        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
        })
        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target)
        })
        dagre.layout(dagreGraph)
        nodes.forEach((node) => {
            const nodeWithPosition = dagreGraph.node(node.id)
            node.targetPosition = 'top'
            node.sourcePosition = 'bottom'
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            }
            return node
        })
        return { nodes, edges }
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes,initialEdges)
    const nodeTypes = useMemo(() => ({root: NodeRoot, nodeH: NodeH, nodeV:NodeV, leaf: NodeLeaf}),[])

    const [myNodes, setMyNodes] = useState(layoutedNodes)

    const onChangeNode = useCallback( (type) => {
        setOrientation(type)
        const nodeOriented = []
        myNodes.forEach((n) => {
            n.type = 'node'+type
            nodeOriented.push(n)
        })
        setMyNodes(nodeOriented)
    },[myNodes, setMyNodes, setOrientation])

    return (
        <ReactFlowProvider>
            <div className="box p-5 reactflow-wrapper h-500">
                <ReactFlow
                    nodes={myNodes}
                    edges={layoutedEdges}
                    zoomOnScroll={false}
                    nodeTypes={nodeTypes}
                    elementsSelectable={false}
                    nodesConnectable={false}
                    nodesDraggable={false}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                >
                    <Panel position="top-right">
                        <ul className="nav nav-boxed-tabs justify-center flex-wrap flex-col">
                            <li className="intro-x mb-2">
                                <div className="nav-item box mb-1 flex items-center zoom-in">
                                    <button
                                        type="button"
                                        className={'nav-link py-4' + (orientation === 'V' ? ' active' : '')}
                                        onClick={() => onChangeNode('V')}
                                    >
                                        <Divide className="w-6 h-6" />
                                    </button>
                                </div>
                            </li>
                            <li className="intro-x mb-2">
                                <div className="nav-item box mb-1 flex items-center zoom-in">
                                    <button
                                        type="button"
                                        className={'nav-link py-4' + (orientation === 'H' ? ' active' : '')}
                                        onClick={() => onChangeNode('H')}
                                    >
                                        <Divide className="w-6 h-6 -rotate-90" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </Panel>
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}