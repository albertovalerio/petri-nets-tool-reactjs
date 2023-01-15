import React from 'react'
import { Handle, Position } from 'reactflow'

export const NodeV = ({ data }) => {

    return (
        <div className="my-custom-node place-node">
            <Handle type="target" position={Position.Top} />
            <div className='token'>{data.mRef}</div>
            <label htmlFor="text">{data.label}</label>
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}