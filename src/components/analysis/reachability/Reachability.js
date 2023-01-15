import React from 'react'
import { ReachabilityGraph } from "./ReachabilityGraph"
import { ReachabilityTree } from "./ReachabilityTree"
import { generateReachabilityMarking } from "./kernel"
import { AlertTriangle } from "react-feather"
import { Toast } from "../../utils/Toast"

export const Reachability = () => {

    const places = JSON.parse(localStorage.getItem('places'))
    const transitions = JSON.parse(localStorage.getItem('transitions'))
    const arcs = JSON.parse(localStorage.getItem('arcs'))
    const markings = places && transitions && arcs ? generateReachabilityMarking(places, transitions, arcs) : []

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
                    <h2 className="text-lg font-medium mr-auto">Reachability</h2>
                    <p className="text-slate-500 mt-2"><strong>Reachability</strong> is a fundamental basis for studying dynamic properties of any system. A marking M<sub>n</sub> is said to be <strong>reachable</strong> from a marking M<sub>0</sub> if there exists a sequence of firings that transform M<sub>0</sub>-M<sub>n</sub>. A marking M<sub>j</sub> is said to be immediately reachable from M<sub>i</sub> if firing an enabled transition in M<sub>i</sub> results in M<sub>j</sub>.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Reachability Tree
                        </h2>
                    </div>
                    <div className="p-5">
                        {
                            markings.length ? <ReachabilityTree markings={markings} /> : <div className="alert alert-secondary show flex items-center mb-2" role="alert"><AlertTriangle className="w-6 h-6 mr-2" /> No Petri Net saved!</div>
                        }
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Reachability Graph
                        </h2>
                    </div>
                    <div className="p-5">
                        {
                            markings.length ? <ReachabilityGraph markings={markings} /> : <div className="alert alert-secondary show flex items-center mb-2" role="alert"><AlertTriangle className="w-6 h-6 mr-2" /> No Petri Net saved!</div>
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}