import { useSelector } from "react-redux"

export function PriorityPicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    if(!info?.priority) return <div className="picker empty-label"></div>

    const label = board.labels.find(label => label.title === info.priority)
    const color = label ? label.color : 'gray'
    
    return <section className="priority-picker picker label" style={{ backgroundColor: color }}>
        <div>{info.priority}</div>
    </section>
}