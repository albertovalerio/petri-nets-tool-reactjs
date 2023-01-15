import React from 'react'
import { useCallback } from "react"
import { AlertTriangle, Circle } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { getPlaceSelection, setPlaceAnalysis, setPlaceSelection, setToastOpt } from "../../../features/controlsSlice"
import { getInputSubset, getOutputSubset } from "./utils"

export const SubsetSelection = ({ places, transitions, arcs }) => {

    const dispatch = useDispatch()
    const selection = useSelector(getPlaceSelection)


    const togglePlace = useCallback((id) => {
        const value = selection[id] ? false : true
        dispatch(setPlaceSelection({id,value}))
    },[dispatch, selection])

    const analyzeSelection = useCallback(() => {
        const selectionIDs = Object.keys(selection).filter(s => selection[s])
        if (selectionIDs.length) {
            const selectionLabels = places.filter(p => selectionIDs.includes(p.id)).map(e => e.data.label)
            dispatch(setPlaceAnalysis({
                status:'pending',
                selection: selectionLabels,
                pre: getInputSubset(selectionIDs,transitions,arcs),
                post: getOutputSubset(selectionIDs,transitions,arcs)
            }))
            setTimeout(() => {
                dispatch(setPlaceAnalysis({status:'fulfilled'}))
            },1500)                
        } else {
            const toast = {
                isVisible: true,
                context: 'pending',
                title: 'Oh oh... Attention!',
                msg: 'No places selected.'
            }
            dispatch(setToastOpt(toast))
            setTimeout(() => {
                dispatch(setToastOpt({isVisible:false}))
            }, 10000)
        }
    },[dispatch,selection,places,transitions,arcs])

    return (
        <>
        {
            places && places.length ? (
                <>
                <ul className="nav nav-boxed-tabs justify-center flex-wrap">
                    {places.map((p,i) => {
                            return (    
                                <li key={i} className="intro-x mb-5">
                                    <div className="nav-item box mr-3 flex items-center zoom-in">
                                        <button
                                            type="button"
                                            className={'nav-link h-full px-6' + (selection[p.id] ? ' active' : '')}
                                            onClick={() => togglePlace(p.id)}
                                        >
                                            <Circle className="w-6 h-6" />
                                            <span>{p.data.label}</span>
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="border-t border-slate-200/60 pt-5">
                    <button className="btn btn-primary w-full h-12" onClick={analyzeSelection}>Analyze Selection</button>
                </div>
                </>
            ) : <div className="alert alert-secondary show flex items-center mb-2" role="alert"><AlertTriangle className="w-6 h-6 mr-2" /> No Petri Net saved!</div>
        }
        </>
    )
}