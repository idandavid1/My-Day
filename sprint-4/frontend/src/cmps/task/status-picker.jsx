import { useSelector } from "react-redux"


export function StatusPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    if(!info.status) return <div className="picker empty-label"></div>
    
    const label = boards[0].labels.find(label => label.title === info.status)
    const color = label.color 
    return <section className="status-picker picker label" style={{ backgroundColor: color }}>
        <div>{info.status}</div>
    </section>
}