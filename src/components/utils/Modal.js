import React from 'react'
import { MousePointer, XCircle } from "react-feather"
import { useDispatch } from "react-redux"
import { setActiveTool, setCanvasOpt, setModalOpt } from "../../features/controlsSlice"
import './css/utils.css'

export const Modal = ({ opt, canvasOpt, onResetCanvas, onChangeStyle }) => {

    const dispatch = useDispatch()
    const arcType = canvasOpt && canvasOpt[opt.target] ? canvasOpt[opt.target].arcType : ''
    
    const onCancel = () => {
        dispatch(setModalOpt({isVisible:false}))
        dispatch(setActiveTool('place'))
    }

    return (
        <div className={'modal overflow-y-auto ' + (opt.isVisible ? 'show' : '')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body p-0">
                        <div className="p-5 text-center">
                            {
                                opt.confirmBtn === 'Delete' ? <XCircle className={'w-16 h-16 mx-auto mt-3 text-'+opt.context} /> : <MousePointer className={'w-16 h-16 mx-auto mt-3 text-'+opt.context} />
                            }
                            <div className="text-3xl mt-5">{opt.title}</div>
                            <div className="text-slate-500 mt-2">{opt.msg}</div>
                        </div>
                        {
                            opt.confirmBtn === 'Confirm' ? (
                                <ul className="nav nav-boxed-tabs justify-center mb-5 flex-wrap">
                                    <li className="intro-x">
                                        <div className="nav-item box h-12 mr-3 flex items-center zoom-in">
                                            <button
                                                type="button"
                                                className={'nav-link h-full px-6' + (arcType === 'straight' ? ' active' : '')}
                                                onClick={() => dispatch(setCanvasOpt({target:opt.target,opt:{arcType:'straight'}}))}
                                            >
                                                Straight
                                            </button>
                                        </div>
                                    </li>
                                    <li className="intro-x">
                                        <div className="nav-item box h-12 mr-3 flex items-center zoom-in">
                                            <button
                                                type="button"
                                                className={'nav-link h-full px-6' + (arcType === 'smoothstep' ? ' active' : '')}
                                                onClick={() => dispatch(setCanvasOpt({target:opt.target,opt:{arcType:'smoothstep'}}))}
                                            >
                                                Step
                                            </button>
                                        </div>
                                    </li>
                                    <li className="intro-x">
                                        <div className="nav-item box h-12 mr-3 flex items-center zoom-in">
                                            <button
                                                type="button"
                                                className={'nav-link h-full px-6' + (arcType === 'default' ? ' active' : '')}
                                                onClick={() => dispatch(setCanvasOpt({target:opt.target,opt:{arcType:'default'}}))}
                                            >
                                                Bezier
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            ) : null
                        }
                    </div>
                    <div className="modal-footer text-center">
                        <button type="button" className="btn btn-outline-secondary w-24 mr-2" onClick={onCancel}>Cancel</button>
                        <button type="button" className={'btn w-24 btn-'+opt.context} onClick={() => opt.confirmBtn === 'Delete' ? onResetCanvas() : onChangeStyle(opt.target)}>{opt.confirmBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}