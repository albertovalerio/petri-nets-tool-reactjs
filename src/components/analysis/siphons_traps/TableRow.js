import React from 'react'
import { CheckCircle, XCircle } from "react-feather"
import { useSelector } from "react-redux"
import { getPlaceAnalysis } from "../../../features/controlsSlice"
import { Loading } from "../../utils/Loading"

export const TableRow = ({ title, values }) => {

    const status = useSelector(getPlaceAnalysis).status

    const markup = (string) => {
        return {__html: string}
    }

    return (
        <tr>
            <td className="whitespace-nowrap" dangerouslySetInnerHTML={markup(title)}></td>
            {
                Array.isArray(values) ? (
                    <td className="text-center">{
                        status === 'pending' ? <Loading /> : (status === 'fulfilled' ? '{ '+values.join(', ')+' }' : '- - -')
                    }</td>        
                ) : (
                    <td className="text-center">{
                        status === 'pending' ? <Loading /> : (status === 'fulfilled' ? (values ? <CheckCircle className="m-auto text-success" /> : <XCircle className="m-auto text-danger" />) : '- - -')
                    }</td>        
                )
            }
        </tr>
    )
}