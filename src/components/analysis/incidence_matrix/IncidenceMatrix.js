import React from 'react'
import { MatrixTable } from "./MatrixTable"
import { initMatrices, matrixDifference, matrixTranspose } from "./utils"

export const IncidenceMatrix = () => {

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
                    <h2 className="text-lg font-medium mr-auto">Incidence Matrix</h2>
                    <p className="text-slate-500 mt-2">For a Petri Net with <em>n</em> transitions and <em>m</em> places, the <strong>incidence matrix</strong> is <em>n</em> by <em>m</em> matrix of the form A = [a<sub>ij</sub>] where <strong>a<sub>ij</sub> = O(t<sub>i</sub>, P<sub>j</sub>) - I(t<sub>i</sub>, P<sub>j</sub>)</strong></p>
                    <p className="text-slate-500 mt-2">The <strong>transpose</strong> of the incidence matrix A<sup>T</sup> is an <em>m</em> by <em>n</em> matrix in which the rows of the transpose are the columns of the incidence matrix.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Post-incidence Matrix ➝ O(t<sub>i</sub>, P<sub>j</sub>)
                        </h2>
                    </div>
                    <div className="p-5">
                        <MatrixTable matrix={post} labels={labels} />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Pre-incidence Matrix ➝ I(t<sub>i</sub>, P<sub>j</sub>)
                        </h2>
                    </div>
                    <div className="p-5">
                        <MatrixTable matrix={pre} labels={labels} />
                    </div>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Incidence Matrix ➝ A<sub>ij</sub> = ( O(t<sub>i</sub>, P<sub>j</sub>) - I(t<sub>i</sub>, P<sub>j</sub>) )
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
                            Incidence Matrix Transposed ➝ A<sup>T</sup>
                        </h2>
                    </div>
                    <div className="p-5">
                        <MatrixTable matrix={matrixTranspose(matrixDifference(post,pre))} labels={labelsTranspose} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}