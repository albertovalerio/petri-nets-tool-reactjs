import React from 'react'
import { Handle, Position } from 'reactflow'

export const PlaceNode = ({ data }) => {

    return (
        <div className="my-custom-node place-node">
            <Handle type="source" position={Position.Right} />
            {
                data.tokens > 0 & data.tokens < 11 ? <div className='token'><img alt='tokens' src={'/images/tokens/'+data.tokens+'.svg'} /></div> : (data.tokens > 10 ? <div className='token'>{data.tokens}</div> : null)
            }
            <label htmlFor="text">{data.label}</label>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}