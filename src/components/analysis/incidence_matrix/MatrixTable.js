import React from 'react'
import { AlertTriangle } from "react-feather"

export const MatrixTable = ({ matrix, labels }) => {

    return (
        <div>
        {(Object.values(matrix).length && Object.values(labels).length) ? (
            <div className="overflow-x-auto">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap text-center"></th>
                            {
                                labels.columns.map((p,i) => {
                                    return (<th key={i} className="whitespace-nowrap text-center text-xl font-medium">{p}</th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.values(matrix).map((row,i) => {
                                return (<tr key={i}><td className="text-center text-xl font-medium">{labels.rows[i]}</td>
                                    {
                                        row.map((a,j) => {
                                            return (
                                                <td key={j} className="text-center">{a}</td>
                                            )
                                        })
                                    }
                                </tr>)})
                        }
                    </tbody>
                </table>
            </div>) : <div className="alert alert-secondary show flex items-center mb-2" role="alert"><AlertTriangle className="w-6 h-6 mr-2" /> No Petri Net saved!</div>
        }
    </div>)
}