import { useSelector } from "react-redux"

export function PriorityPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    if(!info.priority) return <div className="picker empty-label"></div>

    const label = boards[0].labels.find(label => label.title === info.priority)
    const color = label ? label.color : 'gray'
    
    return <section className="priority-picker picker label" style={{ backgroundColor: color }}>
        <div>{info.priority}</div>
    </section>
}