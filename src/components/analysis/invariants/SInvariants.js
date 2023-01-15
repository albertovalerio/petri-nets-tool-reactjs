import React from 'react'
import { MatrixTable } from "../incidence_matrix/MatrixTable"
import { initMatrices, matrixDifference } from "../incidence_matrix/utils"
import { Equations } from "./Equations"

export const SInvariants = () => {

    const places = JSON.parse(localStorage.getItem('places'))
    const transitions = JSON.parse(localStorage.getItem('transitions'))
    const arcs = JSON.parse(localStorage.getItem('arcs'))
    const { pre, post, labels } = places && transitions && arcs ? initMatrices(places, transitions, arcs) : {pre:[],post:[],labels:[]}

    return(
        <>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box p-5">
                    <h2 className="text-lg font-medium mr-auto">S-Invariants</h2>
                    <p className="text-slate-500 mt-2">An <strong>S-invariant</strong>, which is also called a <strong>P-invariant</strong>, is an integer solution <em>y</em> of the equation <strong>Ay = 0</strong>.</p>
                    <p className="text-slate-500 mt-2">The non-zero entries in an S-invariant represent weights associated with the corresponding places so that the weighted sum of tokens on these places is constant for all markings reachable from an initial marking. These places are said to be covered by an S-invariant.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Incidence Matrix ➝ A<sub>ij</sub> = O(t<sub>i</sub>, P<sub>j</sub>) - I(t<sub>i</sub>, P<sub>j</sub>)
                        </h2>
                    </div>
                    <div className="p-5">
                        <MatrixTable matrix={matrixDifference(post,pre)} labels={labels} />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Homogeneous System ➝ Ay = 0
                        </h2>
                    </div>
                    <div className="p-5">
                        <Equations matrix={matrixDifference(post,pre)} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}