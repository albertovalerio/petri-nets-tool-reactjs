import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getToastOpt, resetPlaceAnalysis, setPlaceSelection } from "../../../features/controlsSlice"
import { Toast } from "../../utils/Toast"
import { SubsetAnalysis } from "./SubsetAnalysis"
import { SubsetSelection } from "./SubsetSelection"

export const SiphonsTraps = () => {

    const places = localStorage.getItem('places') && localStorage.getItem('places').length ? JSON.parse(localStorage.getItem('places')) : []
    const transitions = localStorage.getItem('transitions') && localStorage.getItem('transitions').length ? JSON.parse(localStorage.getItem('transitions')) : []
    const arcs = localStorage.getItem('arcs') && localStorage.getItem('arcs').length ? JSON.parse(localStorage.getItem('arcs')) : []

    const dispatch = useDispatch()
    const toastOpt = useSelector(getToastOpt)

    useState(() => {
        places.forEach((p) => {
            dispatch(setPlaceSelection({id:p.id,value:false}))
        })
        dispatch(resetPlaceAnalysis())
    },[dispatch, places])


    return (
        <>
        <Toast opt={toastOpt} />
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <div className="intro-y box p-5">
                    <h2 className="text-lg font-medium mr-auto">Siphons & Traps</h2>
                    <p className="text-slate-500 mt-2">Given a Petri net P = (P, T, I, O, M<sub>0</sub>), one can examine the behavior of what happens to a subset <em>S</em> of the set of states <em>P</em>. Let <sup>*</sup>S denote the set of input transitions into the set <em>S</em>, and S<sup>*</sup> denote the sets of output transitions from set S.</p>
                    <p className="text-slate-500 mt-2">A subset of places <em>S</em> of <em>P</em> is called a <strong>siphon</strong> if <strong><sup>*</sup>S &#8838; S<sup>*</sup></strong>. Intuitively, if a transition is going to deposit a token to a place in a siphon <em>S</em>, the transition must also remove a token from <em>S</em>.</p>
                    <p className="text-slate-500 mt-2">a subset of places <em>S</em> of <em>P</em> is called a <strong>trap</strong> if <strong>S<sup>*</sup> &#8838; <sup>*</sup>S</strong>. Intuitively, a trap <em>S</em> represents a set of places in which every transition consuming a token from <em>S</em> must also deposit a token back into <em>S</em>.</p>
                </div>
            </div>
        </div>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Places's Subset Selection
                        </h2>
                    </div>
                    <div className="p-5">
                        <SubsetSelection places={places} transitions={transitions} arcs={arcs} />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="intro-y box">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Analysis
                        </h2>
                    </div>
                    <div className="p-5">
                        <SubsetAnalysis />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}