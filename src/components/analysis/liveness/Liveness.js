import React from 'react'
import { generateReachabilityMarking, initNodesAndTransitions } from "../reachability/kernel"
import { LivenessTable } from "./LivenessTable"
import './css/style.css'
import { getFiringSequences } from "./utils"
import { Toast } from "../../utils/Toast"

export const Liveness = () => {

    const places = JSON.parse(localStorage.getItem('places'))
    const transitions = JSON.parse(localStorage.getItem('transitions'))
    const arcs = JSON.parse(localStorage.getItem('arcs'))
    const markings = places && transitions && arcs ? generateReachabilityMarking(places, transitions, arcs) : []
    const init = initNodesAndTransitions(markings,'graph')
    const firings = getFiringSequences(markings,init[1])

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
                    <h2 className="text-lg font-medium mr-auto">Liveness</h2>
                    <p className="text-slate-500 mt-2">Denote by L(M<sub>0</sub>) the set of all possible firing sequences starting from M<sub>0</sub>. A transition t in a Petri Net is said to be:</p>
                    <ul className="text-slate-500 mt-2">
                        <li><strong>L0-live</strong> (<em>or dead</em>): if there is no firing sequence in L(M<sub>0</sub>) in which t can fire.</li>
                        <li><strong>L1-live</strong> (<em>or potentially fireable</em>): if t can be fired at least once in some firing sequence in L(M<sub>0</sub>).</li>
                        <li><strong>L2-live</strong>: if t can be fired at least k times in some firing sequence in L(M<sub>0</sub>) given any positive integer k.</li>
                        <li><strong>L3-live</strong>: if t can be fired infinitely often in some firing sequence in L(M<sub>0</sub>).</li>
                        <li><strong>L4-live</strong> (<em>or live</em>): if t is L1-live (potentially fireable) in every marking in R(M<sub>0</sub>).</li>
                    </ul>
                    <p className="text-slate-500 mt-2">A Petri Net is said to be live if all transitions are live. A Petri net is said to be quasi-live if all transitions are quasi-live.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Firing Sequences Set
                        </h2>
                    </div>
                    <div className="p-5 text-2xl font-medium leading-8">
                        <strong>L(M<sub>0</sub>)</strong> &#8788; [ {firings.map((f,i) => ' { '+f.join(' ➝ ').toString()+(firings.length-1===i ? ' } ' : ' }, '))} ]
                    </div>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Liveness Analysis
                        </h2>
                    </div>
                    <div className="p-5">
                        <LivenessTable
                            netIsSet={places && transitions && arcs}
                            transitions={transitions}
                            firings={firings}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}