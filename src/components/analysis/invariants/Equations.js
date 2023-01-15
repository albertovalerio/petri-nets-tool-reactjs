import React from 'react'
import { AlertTriangle } from "react-feather"

export const Equations = ({ matrix }) => {

    const formatEquation = (row) => {
        let counter = 0
        let markup = ''
        let substring = ''
        row.forEach((e,j) => {
            if (e !== 0) {
                if (e === -1) {
                    substring = counter !== 0 ? '<span> - </span><span class="text-3xl font-bold">x<sub>'+(j+1)+'</sub></span>' : '<span>-</span><span class="text-3xl font-bold">x<sub>'+(j+1)+'</sub></span>'
                    markup += substring
                } else if (e === 1) {
                    substring = counter !== 0 ? '<span> + </span><span class="text-3xl font-bold">x<sub>'+(j+1)+'</sub></span>' : '<span class="text-3xl font-bold"> x<sub>'+(j+1)+'</sub></span>'
                    markup += substring
                } else if (e > 1) {
                    substring = counter !== 0 ? '<span> +'+e+' </span><span class="text-3xl font-bold">x<sub>'+(j+1)+'</sub></span>' : '<span> +'+e+'</span><span class="text-3xl font-bold"> x<sub>'+(j+1)+'</sub></span>'
                    markup += substring  
                } else if (e < -1) {
                    substring = '<span>'+e+'</span><span class="text-3xl font-bold"> x<sub>'+(j+1)+'</sub></span>'
                    markup += substring  
                }
                counter++
            }
        })
        markup += ' = 0'
        return {__html: markup}
    }

    return (
        <div>
            {Object.values(matrix).length ? (
                <ul className="text-center leading-8 text-xl">
                    {
                        Object.values(matrix).map((row,i) => {
                            return (<li key={i} dangerouslySetInnerHTML={formatEquation(row)}></li>)
                        })
                    }
                </ul>
            ) : <div className="alert alert-secondary show flex items-center mb-2" role="alert"><AlertTriangle className="w-6 h-6 mr-2" /> No Petri Net saved!</div>}
        </div>
    )
}