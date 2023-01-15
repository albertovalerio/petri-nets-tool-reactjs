import React, { useMemo } from 'react';
import 'reactflow/dist/style.css';
import '../../simulation/css/editor.css'
import ReactFlow, { Controls, Background, ReactFlowProvider, ConnectionLineType } from 'reactflow';
import { NodeRoot } from './NodeRoot'
import { NodeLeaf } from './NodeLeaf'
import { NodeH } from './NodeH';
import { NodeV } from './NodeV';
import dagre from 'dagre'
import { initNodesAndTransitions } from './kernel';

export const ReachabilityTree = ({ markings }) => {

    const [initialNodes, initialEdges] = initNodesAndTransitions(markings,'tree')
    
    const getLayoutedElements = (nodes, edges) => {
        const dagreGraph = new dagre.graphlib.Graph()
        dagreGraph.setDefaultEdgeLabel(() => ({}))
        const nodeWidth = 100
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

    return (
        <ReactFlowProvider>
            <div className="box p-5 reactflow-wrapper h-500">
                <ReactFlow
                    nodes={layoutedNodes}
                    edges={layoutedEdges}
                    zoomOnScroll={false}
                    nodeTypes={nodeTypes}
                    elementsSelectable={false}
                    nodesConnectable={false}
                    nodesDraggable={false}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}