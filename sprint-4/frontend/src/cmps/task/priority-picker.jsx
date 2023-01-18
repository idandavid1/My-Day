
import { useSelector } from "react-redux"


export function PriorityPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const label = boards[0].labels.find(label => label.title === info.priority)
    const color = label ? label.color : 'blue'
    return <section className="priority-picker" style={{ backgroundColor: color }}>
        <div>{info.priority}</div>
    </section>
}