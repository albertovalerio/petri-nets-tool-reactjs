import React from 'react'
import { MatrixTable } from "../incidence_matrix/MatrixTable"
import { initMatrices, matrixDifference, matrixTranspose } from "../incidence_matrix/utils"
import { Equations } from "./Equations"

export const TInvariants = () => {

    const places = JSON.parse(localStorage.getItem('places'))
    const transitions = JSON.parse(localStorage.getItem('transitions'))
    const arcs = JSON.parse(localStorage.getItem('arcs'))
    const { pre, post, labels } = places && transitions && arcs ? initMatrices(places, transitions, arcs) : {pre:[],post:[],labels:[]}
    const labelsTranspose = {
        columns: labels.rows,
        rows: labels.columns
    }

    return(
        <>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box p-5">
                    <h2 className="text-lg font-medium mr-auto">T-Invariants</h2>
                    <p className="text-slate-500 mt-2">A <strong>T-invariant</strong> is an integer solution <em>x</em> of the homogeneous equation <strong>A<sup>T</sup>x = 0</strong>.</p>
                    <p className="text-slate-500 mt-2">The non-zero entries in a T-invariant represent the firing counts of the corresponding transitions, which belong to a firing sequence transforming a marking M<sub>0</sub> back to M<sub>0</sub>.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Incidence Matrix Transposed ➝ A<sup>T</sup> = ( O(t<sub>i</sub>, P<sub>j</sub>) - I(t<sub>i</sub>, P<sub>j</sub>) )<sup>T</sup>
                        </h2>
                    </div>
                    <div className="p-5">
                        <MatrixTable matrix={matrixTranspose(matrixDifference(post,pre))} labels={labelsTranspose} />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Homogeneous System ➝ A<sup>T</sup>x = 0
                        </h2>
                    </div>
                    <div className="p-5">
                        <Equations matrix={matrixTranspose(matrixDifference(post,pre))} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}