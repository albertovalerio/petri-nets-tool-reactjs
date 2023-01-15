import React from 'react'
import { Handle, Position } from 'reactflow'

export const NodeH = ({ data }) => {

    return (
        <div className="my-custom-node place-node">
            <Handle type="target" position={Position.Right} />
            <div className='token'>{data.mRef}</div>
            <label htmlFor="text">{data.label}</label>
            <Handle type="source" position={Position.Left} />
        </div>
    )
}