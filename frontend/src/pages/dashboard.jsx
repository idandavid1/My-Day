import { useSelector } from "react-redux";
import { LabelChart } from "../cmps/chart/label-chart";
import { MemberChart } from "../cmps/chart/member-chart";


export function Dashboard () {
    const board = useSelector(storeState => storeState.boardModule.board)
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    return (
        <section className="dashboard">
            <LabelChart board={board} dynamicModalObj={dynamicModalObj}/>
            <MemberChart board={board} dynamicModalObj={dynamicModalObj}/>
        </section>
    )
}