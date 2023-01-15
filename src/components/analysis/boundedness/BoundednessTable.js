import React from 'react'
import { CheckCircle, XCircle } from "react-feather"
import { getBoundedness } from "./utils"

export const BoundednessTable = ({ netIsSet, places, markings }) => {

    return (
        <div className="overflow-x-auto">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="text-center font-bold">
                        <th className="whitespace-nowrap">Places</th>
                        <th className="whitespace-nowrap">Boundedness</th>
                        <th className="whitespace-nowrap">Safeness</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        netIsSet ? places.map((p,i) => {
                            return (
                                <tr key={i} className="text-center">
                                    <td>
                                        <div className="boundedness-node flex items-center">
                                            <div className="boundedness-handle-target"></div>
                                            <span>{p.data.label}</span>
                                            <div className="boundedness-handle-source"></div>
                                        </div>
                                    </td>
                                    <td>{getBoundedness(i,markings)}</td>
                                    <td>{getBoundedness(i,markings) === 1 ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                </tr>
                            )
                        }) : <tr ><td className="text-center bg-slate-200 h-20 text-slate-500" colSpan="3">No Petri Net saved!</td></tr>
                    }                    
                </tbody>
            </table>
        </div>
    )
}