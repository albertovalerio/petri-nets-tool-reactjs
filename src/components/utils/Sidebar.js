import React from 'react'
import { useCallback } from "react"
import { X } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { getElementToModify, setElementToModify, setIsSidebarVisible } from "../../features/controlsSlice"
import './css/utils.css'

export const Sidebar = ({isVisible, onDelete, onUpdate}) => {

    const dispatch = useDispatch()
    const el = useSelector(getElementToModify)

    const onSpinner = useCallback((direction, target) => {
        let num = 0
        num = target === 'token' ? parseInt(el.data.tokens) : parseInt(el.label)
        num = num === 0 && direction === 'down' ? 0 : direction === 'up' ? num + 1 : num - 1
        dispatch(setElementToModify({field:target,value:num}))
    },[el, dispatch])

    const onCancelChanges = () => {
        dispatch(setElementToModify({}))
        dispatch(setIsSidebarVisible(false))
    }

    return (
        <div className={'modal modal-slide-over overflow-y-auto ' + (isVisible && el && Object.keys(el).length !== 0 ? 'show' : '')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="sidebar-close" onClick={onCancelChanges}>
                        <X className="w-8 h-8 text-slate-400" />
                    </button>
                    { el && Object.keys(el).length !== 0 ? (
                        <>
                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto">Selected Element: {
                                el.type === 'place' ? 'Place '+el.data.label : (el.type === 'transition' ? 'Transition '+el.data.label : 'Edge')
                            }</h2>
                        </div>
                        <div className="modal-body">
                            {
                                el.type === 'place' || el.type === 'transition' ? (
                                    <div>
                                        <label htmlFor="new-label" className="form-label">New Label</label>
                                        <input type="text" id="new-label" className="form-control" value={el.data.label} onChange={(e) => dispatch(setElementToModify({field:'label',value:e.target.value}))} />
                                    </div>    
                                ) : null
                            }
                            {
                                el.type === 'place' ? (
                                    <div className="mt-3">
                                        <label htmlFor="token-spinner" className="form-label">Tokens</label>
                                        <div className="input-group">
                                            <button
                                                type="button"
                                                className="btn btn-default spinner-down"
                                                onClick={() => onSpinner('down','token')}
                                            >-</button>
                                            <input
                                                type="text"
                                                id="token-spinner"
                                                className="form-control text-center"
                                                value={parseInt(el.data.tokens)}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-default spinner-up"
                                                onClick={() => onSpinner('up','token')}
                                            >+</button>
                                        </div>
                                    </div>
                                ) : null
                            }
                            {
                                el.type !== 'place' && el.type !== 'transition' ? (
                                    <div className="mt-3">
                                        <label htmlFor="cardinality-spinner" className="form-label">Cardinality/Multiplicity</label>
                                        <div className="input-group">
                                            <button
                                                type="button"
                                                className="btn btn-default spinner-down"
                                                onClick={() => onSpinner('down','cardinality')}
                                            >-</button>
                                            <input
                                                type="text"
                                                id="cardinality-spinner"
                                                className="form-control text-center"
                                                value={parseInt(el.label)}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-default spinner-up"
                                                onClick={() => onSpinner('up','cardinality')}
                                            >+</button>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="modal-footer w-full absolute bottom-0">
                        <button
                                type="button"
                                className="btn btn-outline-secondary mr-2 w-full md:w-max mb-2 md:mb-0"
                                onClick={onCancelChanges}
                            >Cancel changes</button>
                            <button
                                type="button"
                                className="btn btn-danger mr-2 w-full md:w-max mb-2 md:mb-0"
                                onClick={() => onDelete(el)}
                            >Delete element</button>
                            <button
                                type="button"
                                className="btn btn-primary w-full md:w-max mb-2 md:mb-0"
                                onClick={() => onUpdate(el)}
                            >Confirm changes</button>
                        </div>
                        </>
                    ) : null }
                </div>
            </div>
        </div>
    )
}