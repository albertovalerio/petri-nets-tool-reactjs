import React from 'react'
import { Handle, Position } from 'reactflow';

export const TransitionNode = ({ data }) => {

    return (
        <div className="my-custom-node transition-node">
            <Handle type="source" position={Position.Right} />
            <label htmlFor="text">{data.label}</label>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}