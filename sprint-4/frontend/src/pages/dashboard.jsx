import { useSelector } from "react-redux";
import { LabelChart } from "../cmps/chart/label-chart";
import { MemberChart } from "../cmps/chart/member-chart";


export function Dashboard () {
    const board = useSelector(storeState => storeState.boardModule.board)
    return (
        <section className="dashboard">
            <LabelChart board={board}/>
            <MemberChart board={board}/>
        </section>
    )
}