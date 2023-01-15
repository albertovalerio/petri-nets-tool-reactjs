import React from 'react'
import { CheckCircle, XCircle } from "react-feather"
import { printMultiArray } from "./utils"

export const ReversibilityTable = ({ netIsSet, m0, counterexample }) => {

    return (
        <div className="overflow-x-auto">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="text-center font-bold">
                        <th className="whitespace-nowrap">M<sub>0</sub></th>
                        <th className="whitespace-nowrap">Reversibility</th>
                        <th className="whitespace-nowrap">Counterexample</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        netIsSet ? (
                            <tr className="text-center">
                                <td className="whitespace-nowrap">{m0 && m0[0].length ? printMultiArray(m0) : '- - -'}</td>
                                <td>{counterexample && counterexample[0].length ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />}</td>
                                <td className="whitespace-nowrap">{counterexample && counterexample[0].length ? printMultiArray(counterexample) : '- - -'}</td>
                            </tr>
                        ) : <tr ><td className="text-center bg-slate-200 h-20 text-slate-500" colSpan="3">No Petri Net saved!</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}