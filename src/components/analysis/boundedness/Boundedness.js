import React from 'react'
import { Toast } from "../../utils/Toast"
import { generateReachabilityMarking } from "../reachability/kernel"
import { BoundednessTable } from "./BoundednessTable"
import './css/style.css'

export const Boundedness = () => {

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
                    <h2 className="text-lg font-medium mr-auto">Boundedness</h2>
                    <p className="text-slate-500 mt-2">A place p is said to be <strong>k-bounded</strong> if the number of tokens in p is always less than or equal to k for every marking M reachable from the initial marking M<sub>0</sub>, that is, M &isin; R(M<sub>0</sub>). Since it is not possible to “borrow” tokens that don't exist, it follows that k must be a nonnegative integer number. A place is <strong>safe</strong> if it is 1-bounded.</p>
                    <p className="text-slate-500 mt-2">A Petri net N = (P, T, I, O, M<sub>0</sub>) is k-bounded (safe) if each place in P is k-bounded (safe).</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Boundedness Analysis
                        </h2>
                    </div>
                    <div className="p-5">
                        <BoundednessTable
                            netIsSet={places && transitions && arcs}
                            places={places ? places : []}
                            markings={markings}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}