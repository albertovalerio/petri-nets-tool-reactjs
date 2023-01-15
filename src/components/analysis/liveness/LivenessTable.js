import React from 'react'
import { CheckCircle, XCircle } from "react-feather"
import { isL0live, isL1live, isL2live, isL3live, isL4live } from "./utils"

export const LivenessTable = ({ netIsSet, transitions, firings }) => {


    return (
        <div className="overflow-x-auto">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="text-center font-bold">
                        <th className="whitespace-nowrap">Transitions</th>
                        <th className="whitespace-nowrap">L0-live</th>
                        <th className="whitespace-nowrap">L1-live</th>
                        <th className="whitespace-nowrap">L2-live</th>
                        <th className="whitespace-nowrap">L3-live</th>
                        <th className="whitespace-nowrap">L4-live</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        netIsSet ? transitions.map((t,i) => {
                            return (
                                <tr key={i} className="text-center">
                                    <td>
                                        <div className="liveness-node flex items-center">
                                            <div className="liveness-handle-target"></div>
                                            <div className="liveness-handle-source"></div>
                                        </div>
                                        <span>{t.data.label}</span>
                                    </td>
                                    <td>{isL0live(firings,t.data.label) ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                    <td>{isL1live(firings,t.data.label) ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                    <td>{isL2live(firings,t.data.label) ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                    <td>{isL3live(firings,t.data.label) ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                    <td>{isL4live(firings,t.data.label) ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                </tr>
                            )
                        }) : <tr ><td className="text-center bg-slate-200 h-20 text-slate-500" colSpan="6">No Petri Net saved!</td></tr>
                    }                    
                </tbody>
            </table>
        </div>
    )
}