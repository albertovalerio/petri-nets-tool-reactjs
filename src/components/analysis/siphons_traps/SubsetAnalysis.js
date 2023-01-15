import React from "react"
import { useSelector } from "react-redux"
import { getPlaceAnalysis } from "../../../features/controlsSlice"
import { TableRow } from "./TableRow"
import { isSiphon, isTrap } from "./utils"

export const SubsetAnalysis = () => {

    const analysis = useSelector(getPlaceAnalysis)

    return (
        <div className="overflow-x-auto">
            <table className="table table-bordered table-hover">
                <tbody>
                    <TableRow
                        title={'Subset selected'}
                        values={analysis.selection}
                    />
                    <TableRow
                        title={'Input transitions (<sup>*</sup>S)'}
                        values={analysis.pre}
                    />
                    <TableRow
                        title={'Output transitions (S<sup>*</sup>)'}
                        values={analysis.post}
                    />
                    <TableRow
                        title={'Siphon (<sup>*</sup>S &#8838; S<sup>*</sup>)'}
                        values={isSiphon(analysis.pre, analysis.post)}
                    />
                    <TableRow
                        title={'Trap (S<sup>*</sup> &#8838; <sup>*</sup>S)'}
                        values={isTrap(analysis.pre, analysis.post)}
                    />
                </tbody>
            </table>
        </div>
    )
}