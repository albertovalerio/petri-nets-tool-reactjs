import React from 'react'
import { Toast } from "../../utils/Toast"
import { generateReachabilityMarking, initNodesAndTransitions } from "../reachability/kernel"
import { ReversibilityTable } from "./ReversibilityTable"
import { isReversible } from "./utils"

export const Reversibility = () => {

    const places = JSON.parse(localStorage.getItem('places'))
    const transitions = JSON.parse(localStorage.getItem('transitions'))
    const arcs = JSON.parse(localStorage.getItem('arcs'))
    const markings = places && transitions && arcs ? generateReachabilityMarking(places, transitions, arcs) : []
    const init = initNodesAndTransitions(markings,'graph')
    const {m0,counterexample} = isReversible(markings,init[1])

    const toastOpt = {
        isVisible: markings.length > 300,
        context: 'danger',
        title: 'Maximum number of iterations exceeded.',
        msg: 'Possible problems of non-termination. Check if the Petri Net saved is really bounded!'
    }

    return(
        <>
        <Toast opt={toastOpt} />
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box p-5">
                    <h2 className="text-lg font-medium mr-auto">Reversibility</h2>
                    <p className="text-slate-500 mt-2">A Petri Net is reversible if for each reachable marking M, M<sub>0</sub> is reachable from M.</p>
                    <p className="text-slate-500 mt-2">In a reversible Petri Net one can always get back to the initial state.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Reversibility Analysis
                        </h2>
                    </div>
                    <div className="p-5">
                        <ReversibilityTable
                            netIsSet={places && transitions && arcs && places.length && transitions.length && arcs.length}
                            m0={m0}
                            counterexample={counterexample}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}