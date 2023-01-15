import React from 'react'
import * as Icon from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { warnings as w } from "../../config/warnings"
import { getActiveTool, getSelectMsg, setActiveTool, setIsSelectable, setModalOpt, setSelectMsg } from "../../features/controlsSlice"

export const EditorControls = ({ onSaveCanvas }) => {

    const dispatch = useDispatch()
    const activeTool = useSelector(getActiveTool)
    const selectMsg = useSelector(getSelectMsg)

    const onControlsClick = (target) => {
        dispatch(setActiveTool(target))
        dispatch(setIsSelectable(target === 'pointer' ? true : false))
        if (target === 'delete') {
            const modal = {
                target,
                isVisible: true,
                context: 'danger',
                title: 'Are you sure?',
                msg: 'Do you really want to delete the canvas? This process cannot be undone.',
                confirmBtn: 'Delete'
            }
            dispatch(setModalOpt(modal))
        }
        if (target === 'arc') {
            const modal = {
                target:'editor',
                isVisible: true,
                context: 'primary',
                title: 'Pick your style!',
                msg: 'Select one of the following styles to be applied to arcs on canvas.',
                confirmBtn: 'Confirm',
            }
            dispatch(setModalOpt(modal))
        }
    }

    return(
        <div className="grid grid-cols-10 gap-5 mt-5">
            <div className="col-span-12 xl:col-span-4">
                <ul className="nav nav-boxed-tabs justify-center h-full flex-wrap">
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'save' ? ' active' : '')}
                                onClick={onSaveCanvas}
                                onMouseEnter={() => dispatch(setSelectMsg('save'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                            >
                                <Icon.Save className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'place' ? ' active' : '')}
                                onClick={() => onControlsClick('place')}
                                onMouseEnter={() => dispatch(setSelectMsg('place'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                            >
                                <Icon.Circle className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'transition' ? ' active' : '')}
                                onClick={() => onControlsClick('transition')}
                                onMouseEnter={() => dispatch(setSelectMsg('transition'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                                >
                                <Icon.Smartphone className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'pointer' ? ' active' : '')}
                                onClick={() => onControlsClick('pointer')}
                                onMouseEnter={() => dispatch(setSelectMsg('pointer'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                            >
                                <Icon.MousePointer className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'arc' ? ' active' : '')}
                                onClick={() => onControlsClick('arc')}
                                onMouseEnter={() => dispatch(setSelectMsg('arc'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                                >
                                <Icon.CornerDownRight className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                    <li className="intro-x mb-2">
                        <div className="nav-item box h-full mr-3 flex items-center zoom-in">
                            <button
                                type="button"
                                className={'nav-link h-full px-6' + (activeTool === 'delete' ? ' active' : '')}
                                onClick={() => onControlsClick('delete')}
                                onMouseEnter={() => dispatch(setSelectMsg('delete'))}
                                onMouseLeave={() => dispatch(setSelectMsg(activeTool))}
                            >
                                <Icon.Trash2 className="w-6 h-6" />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-span-12 xl:col-span-6">
                <div className="box p-5 flex items-center mb-2">
                    <div className="w-10 h-full">
                        <Icon.Info />
                    </div>
                    <div className="ml-4 mr-auto">
                        <div className="font-medium">{w[selectMsg].title}</div>
                        <div className="text-slate-500 text-xs mt-0.5 lg:h-7">{w[selectMsg].msg}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}