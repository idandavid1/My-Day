import { useSelector } from "react-redux"


export function StatusPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const label = boards[0].labels.find(label => label.title === info.status)
    const color = label ? label.color : 'blue'
    return <section className="status-picker" style={{ backgroundColor: color }}>
        <div>{info.status}</div>
    </section>
}