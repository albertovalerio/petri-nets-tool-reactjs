import React from "react"
import { CheckCircle, Info, XOctagon } from "react-feather"
import { useDispatch } from "react-redux"
import { setToastOpt } from "../../features/controlsSlice"
import './css/utils.css'

export const Toast = ({opt}) => {

    const dispatch = useDispatch()

    return(
        <div className={'toastify toastify-right toastify-top ' + (opt.isVisible ? 'on' : '')}>
            <div className={'toastify-content flex ' + (!opt.isVisible ? 'hidden' : '')}>
                {
                    opt.context === 'pending' ? <XOctagon className={'text-'+opt.context} /> : (opt.context === 'success' ? <CheckCircle className={'text-'+opt.context} /> : <Info className={'text-'+opt.context} />)

                }
                <div className="ml-4 mr-4">
                    <div className={'uppercase font-bold text-'+opt.context}>{opt.title}</div>
                    <div className="text-slate-500 mt-1">{opt.msg}</div>
                </div>
            </div>
            <span className="toast-close" onClick={() => dispatch(setToastOpt({isVisible:false}))}>✖</span>
        </div>
    )
}